# 缎带材质记录 · 2026-09-09

本轮根据用户提供的黄白毕业胸花参考图，补充缎带的细密织纹、窄织边、折口内侧阴影、根部捏褶和随曲面变化的光泽。界面的柔软回弹继续保留。

## 参考与来源

- 用户提供的胸花游戏参考图：用于造型与整体观感方向。
- [益正纺织双面缎带实物近照](https://www.ribbon-maker.com.tw/upload-files/products/Ribbon-Series/Double-Face/YJD-003.jpg)：在浏览器实际查看织纹、薄边与弯折亮暗，仅作观察参考，未下载或用作游戏素材。
- [Curry Ribbons 双面缎带说明](https://www.curryribbons.com/woven-edge-ribbon)：说明双面缎带的光泽和织边结构。
- 项目已有 `satin-weave-horizontal.jpg`、`satin-weave.jpg`：作为材料小样、星芒与尾带织纹。其原始拍摄来源未在本轮核验。

## 生成素材

- 模式：内置 imagegen；生成新的写实素材，非实拍照片。
- 最终文件：`assets/materials/satin-loop-neutral-v1.png`，1983 × 793，RGBA。
- 工具原始输出：`/Users/jianqiao.ji/.codex/generated_images/01a085bb-127d-74e0-8ec8-6d26e16b1398/exec-7cef0d4f-8e3c-41f6-ba4c-e9c84145f696.png`。
- 无位图后期编辑；SVG 控制取景与摆放，颜色滤镜统一染色，保留中性贴图原有的织纹与亮暗。素材及已有织纹内嵌于 `satin-data.js`，用于实时预览和图片导出。
- 圆环、扇形、蝴蝶使用该折环；星芒继续使用独立尖角折法，并加入布面纹理。该版本仍是二维组合预览。

## 使用的完整提示词

```text
Use case: product-mockup. Asset type: ONE photorealistic cutout sprite for a ribbon corsage making game, not an illustration and not a whole corsage. Create a macro product photograph of ONE open folded satin ribbon loop, lying horizontally, narrow pinched root at the LEFT and a broad rounded loop bend at the RIGHT. The strip has genuine thin cloth construction: parallel ribbon edges, very fine lustrous satin weave, tiny woven selvedge, a flat broad front face with a sharp directional silky highlight that turns into shadow at the fold, visible dark interior behind the return edge at the right. A loop folded from 4cm-wide ribbon, like a real hand-made award rosette component, NOT a tube, inflated petal, balloon, leaf or complete bow. Entire ribbon is achromatic ivory/silver-white neutral grey, no warm or cool colour cast, because the game will dye this neutral sprite. Real softbox macro photography, delicate fibre detail, restrained sharp specular reflections, believable material wrinkles at the pinched root. View from directly above with slight angle sufficient to see the thin return edge and inner opening. Long axis horizontal, all of the piece fully visible, ends pinned together at left, no trailing tails. Single object isolated on a genuinely transparent alpha background, no floor or background shadow, no checkerboard baked into the image. Landscape composition around 2.5:1, tightly framed with 6 percent transparent padding. No text, no decorations, no pearls, no gold, no UI, no logos, no human hands. The result must look like a photographed real satin ribbon loop suitable for repeatedly rotating around a rosette centre.
```
