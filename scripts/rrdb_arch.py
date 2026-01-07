import torch
from torch import nn
import torch.nn.functional as F

class ResidualDenseBlock_5C(nn.Module):
    def __init__(self, in_channels, growth_channels=32):
        super().__init__()
        gc = growth_channels
        self.conv1 = nn.Conv2d(in_channels, gc, 3, 1, 1)
        self.conv2 = nn.Conv2d(in_channels + gc, gc, 3, 1, 1)
        self.conv3 = nn.Conv2d(in_channels + gc * 2, gc, 3, 1, 1)
        self.conv4 = nn.Conv2d(in_channels + gc * 3, gc, 3, 1, 1)
        self.conv5 = nn.Conv2d(in_channels + gc * 4, in_channels, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(negative_slope=0.2, inplace=True)

    def forward(self, x):
        x1 = self.lrelu(self.conv1(x))
        x2 = self.lrelu(self.conv2(torch.cat((x, x1), 1)))
        x3 = self.lrelu(self.conv3(torch.cat((x, x1, x2), 1)))
        x4 = self.lrelu(self.conv4(torch.cat((x, x1, x2, x3), 1)))
        x5 = self.conv5(torch.cat((x, x1, x2, x3, x4), 1))
        return x5 * 0.2 + x

class RRDB(nn.Module):
    def __init__(self, in_channels, growth_channels=32):
        super().__init__()
        self.rdb1 = ResidualDenseBlock_5C(in_channels, growth_channels)
        self.rdb2 = ResidualDenseBlock_5C(in_channels, growth_channels)
        self.rdb3 = ResidualDenseBlock_5C(in_channels, growth_channels)

    def forward(self, x):
        out = self.rdb1(x)
        out = self.rdb2(out)
        out = self.rdb3(out)
        return out * 0.2 + x

class RRDBNet(nn.Module):
    def __init__(self, in_nc=3, out_nc=3, nf=64, nb=23, gc=32, upscale=4):
        super().__init__()
        self.conv_first = nn.Conv2d(in_nc, nf, 3, 1, 1)
        # body: list of RRDB blocks
        self.body = nn.ModuleList([RRDB(nf, gc) for _ in range(nb)])
        self.conv_body = nn.Conv2d(nf, nf, 3, 1, 1)

        # upsampling layers
        self.conv_up1 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_up2 = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_hr = nn.Conv2d(nf, nf, 3, 1, 1)
        self.conv_last = nn.Conv2d(nf, out_nc, 3, 1, 1)
        self.lrelu = nn.LeakyReLU(negative_slope=0.2, inplace=True)
        self.upscale = upscale

    def forward(self, x):
        fea = self.conv_first(x)
        trunk = fea
        for block in self.body:
            trunk = block(trunk)
        trunk = self.conv_body(trunk)
        fea = fea + trunk

        # two-stage upsample assuming upscale==4
        if self.upscale == 4:
            fea = self.lrelu(self.conv_up1(F.interpolate(fea, scale_factor=2, mode='nearest')))
            fea = self.lrelu(self.conv_up2(F.interpolate(fea, scale_factor=2, mode='nearest')))
        elif self.upscale == 2:
            fea = self.lrelu(self.conv_up1(F.interpolate(fea, scale_factor=2, mode='nearest')))
        else:
            # fallback: single upsample to outscale
            fea = F.interpolate(fea, scale_factor=self.upscale, mode='nearest')
            fea = self.lrelu(self.conv_hr(fea))

        out = self.lrelu(self.conv_hr(fea))
        out = self.conv_last(out)
        return out
