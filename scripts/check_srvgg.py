from realesrgan.archs.srvgg_arch import SRVGGNetCompact
m=SRVGGNetCompact(num_in_ch=3,num_out_ch=3,num_feat=64,num_conv=16,upscale=4,act_type='prelu')
print('len body',len(m.body))
shapes=[getattr(m.body[i],'weight').shape if hasattr(m.body[i],'weight') else None for i in range(len(m.body))]
for i,s in enumerate(shapes[:40]):
    print(i, s)