import{t as e}from"./mat4f64-E_FXCKxO.js";import{b as t,x as n}from"./mat4-DMNEwJ3K.js";import"./enums-CsvnPRfA.js";import{c as r,l as i}from"./Emissions.glsl-CRxho4Nn.js";import{n as a,t as o}from"./glsl-ESansrKa.js";import"./Texture-DDP8SCQ7.js";import{B as s,K as c,Lt as l,U as u,W as d,Y as f,q as p}from"./VertexColor.glsl-Cz_xCVnS.js";import{t as m}from"./VisualVariables.glsl-Bc3arH7F.js";import"./graphicUtils-8ZOJnuS0.js";var h=8;function g(e,l){let{vertex:u,attributes:g}=e;u.uniforms.add(new r(`intrinsicWidth`,e=>e.width));let{hasScreenSizePerspective:v,spherical:y}=l;v?(e.include(c,l),p(u),s(u,l),u.uniforms.add(new d(`inverseViewMatrix`,(e,r)=>t(_,n(_,r.camera.viewMatrix,e.origin)))),u.code.add(a`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${y?a`normalize(worldPos + localOrigin)`:a`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):u.code.add(a`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),l.hasVVSize?(g.add(`sizeFeatureAttribute`,`float`),u.uniforms.add(new i(`vvSizeMinSize`,e=>e.vvSize.minSize),new i(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new i(`vvSizeOffset`,e=>e.vvSize.offset),new i(`vvSizeFactor`,e=>e.vvSize.factor),new i(`vvSizeFallback`,e=>e.vvSize.fallback)),u.code.add(a`
    float getSize(${o(v,`vec3 pos`)}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${o(v,`applyLineSizeScreenSizePerspective(size, pos)`,`size`)};
    }
    `)):(g.add(`size`,`float`),u.code.add(a`
    float getSize(${o(v,`vec3 pos`)}) {
      float fullSize = intrinsicWidth * size;
      return ${o(v,`applyLineSizeScreenSizePerspective(fullSize, pos)`,`fullSize`)};
    }
    `)),l.hasVVOpacity?(g.add(`opacityFeatureAttribute`,`float`),u.constants.add(`vvOpacityNumber`,`int`,8),u.uniforms.add(new f(`vvOpacityValues`,e=>e.vvOpacity.values,h),new f(`vvOpacityOpacities`,e=>e.vvOpacity.opacityValues,h),new r(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),u.code.add(a`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${o(l.hasVVColor,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):u.code.add(a`vec4 applyOpacity(vec4 color) {
return color;
}`),l.hasVVColor?(e.include(m,l),g.add(`colorFeatureAttribute`,`float`),u.code.add(a`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(g.add(`color`,`vec4`),u.code.add(a`vec4 getColor() {
return applyOpacity(color);
}`))}var _=e();function v(e){e.vertex.code.add(`#define noPerspectiveWrite(x, w) (x * w)`)}function y(e){e.fragment.code.add(`#define noPerspectiveRead(x) (x * gl_FragCoord.w)`)}var b=.25;function x(e,t){let n=e.vertex,r=t.hasScreenSizePerspective;u(n),n.uniforms.get(`markerScale`)??n.constants.add(`markerScale`,`float`,1),n.constants.add(`markerSizePerLineWidth`,`float`,10).code.add(a`
  float getLineWidth(${o(r,`vec3 pos`)}) {
     return max(getSize(${o(r,`pos`)}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),t.space===2&&(n.constants.add(`maxSegmentLengthFraction`,`float`,.45),n.uniforms.add(new l(`perRenderPixelRatio`,e=>e.camera.perRenderPixelRatio)),n.code.add(a`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${o(r,`pos`)})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${o(r,`pos`)})) * screenToWorldRatio;
  }
  `))}export{g as a,v as i,b as n,y as r,x as t};