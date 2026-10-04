import{l as e}from"./Emissions.glsl-CRxho4Nn.js";import{n as t}from"./glsl-ESansrKa.js";import{J as n,Rt as r,X as i,Y as a}from"./VertexColor.glsl-Cz_xCVnS.js";function o(e){e.code.add(t`struct MaskedColor {
vec4 color;
bvec4 mask;
};`)}function s(e){e.include(o),e.code.add(t`
    MaskedColor createMaskedFromUInt8NaNColor(vec4 color) {
      return MaskedColor(color * ${t.float(1/254)}, equal(color, vec4(255)));
    }
  `)}function c(e){e.include(o),e.code.add(t`vec4 maskedColorSelectOrOne(MaskedColor color) {
return vec4(
color.mask.r ? 1.0 : color.color.r,
color.mask.g ? 1.0 : color.color.g,
color.mask.b ? 1.0 : color.color.b,
color.mask.a ? 1.0 : color.color.a
);
}
MaskedColor multiplyMaskedColors(MaskedColor color1, MaskedColor color2) {
vec4 masked1 = maskedColorSelectOrOne(color1);
vec4 masked2 = maskedColorSelectOrOne(color2);
return MaskedColor(masked1 * masked2, bvec4(ivec4(color1.mask) & ivec4(color2.mask)));
}`)}function l(e){e.include(o),e.code.add(t`MaskedColor createMaskedFromNaNColor(vec4 color) {
return MaskedColor(color, isnan(color));
}`)}function u(s,u){let{vertex:d,attributes:f}=s;u.hasVVInstancing&&(u.hasVVSize||u.hasVVColor)&&f.add(`instanceFeatureAttribute`,`vec4`),u.hasVVSize?(d.uniforms.add(new e(`vvSizeMinSize`,e=>e.vvSize.minSize)),d.uniforms.add(new e(`vvSizeMaxSize`,e=>e.vvSize.maxSize)),d.uniforms.add(new e(`vvSizeOffset`,e=>e.vvSize.offset)),d.uniforms.add(new e(`vvSizeFactor`,e=>e.vvSize.factor)),d.uniforms.add(new e(`vvSizeFallback`,e=>e.vvSize.fallback)),d.uniforms.add(new n(`vvSymbolRotationMatrix`,e=>e.vvSymbolRotationMatrix)),d.uniforms.add(new e(`vvSymbolAnchor`,e=>e.vvSymbolAnchor)),d.code.add(t`vec3 vvScale(vec4 _featureAttribute) {
if (isnan(_featureAttribute.x)) {
return vvSizeFallback;
}
return clamp(vvSizeOffset + _featureAttribute.x * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize);
}
vec4 vvTransformPosition(vec3 position, vec4 _featureAttribute) {
return vec4(vvSymbolRotationMatrix * ( vvScale(_featureAttribute) * (position + vvSymbolAnchor)), 1.0);
}`),d.code.add(t`
      const float eps = 1.192092896e-07;
      vec4 vvTransformNormal(vec3 _normal, vec4 _featureAttribute) {
        vec3 scale = max(vvScale(_featureAttribute), eps);
        return vec4(vvSymbolRotationMatrix * _normal / scale, 1.0);
      }

      ${u.hasVVInstancing?t`
      vec4 vvLocalNormal(vec3 _normal) {
        return vvTransformNormal(_normal, instanceFeatureAttribute);
      }

      vec4 localPosition() {
        return vvTransformPosition(position, instanceFeatureAttribute);
      }`:``}
    `)):d.code.add(t`vec4 localPosition() { return vec4(position, 1.0); }
vec4 vvLocalNormal(vec3 _normal) { return vec4(_normal, 1.0); }`),s.vertex.include(o),u.hasVVColor?(d.constants.add(`vvColorNumber`,`int`,8),d.uniforms.add(new a(`vvColorValues`,e=>e.vvColor.values,8),new i(`vvColorColors`,e=>e.vvColor.colors,8),new r(`vvColorFallback`,e=>e.vvColor.fallback,{supportsNaN:!0})),u.hasVVInstancing&&(s.vertex.include(c),s.vertex.include(l)),d.code.add(t`
      vec4 interpolateVVColor(float value) {
        if (isnan(value)) {
          return vvColorFallback;
        }

        if (value <= vvColorValues[0]) {
          return vvColorColors[0];
        }

        for (int i = 1; i < vvColorNumber; ++i) {
          if (vvColorValues[i] >= value) {
            float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
            return mix(vvColorColors[i-1], vvColorColors[i], f);
          }
        }
        return vvColorColors[vvColorNumber - 1];
      }

      vec4 vvGetColor(vec4 featureAttribute) {
        return interpolateVVColor(featureAttribute.y);
      }

      ${u.hasVVInstancing?t`
            vec4 vvColor() {
              return vvGetColor(instanceFeatureAttribute);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return multiplyMaskedColors(color, createMaskedFromNaNColor(vvColor()));
            }
            `:t`
            vec4 vvColor() {
              return vec4(1.0);
            }

            MaskedColor applyVVColor(MaskedColor color) {
              return color;
            }
            `}
    `)):d.code.add(t`vec4 vvColor() {
return vec4(1.0);
}
MaskedColor applyVVColor(MaskedColor color) {
return color;
}`)}export{o as a,l as i,c as n,s as r,u as t};