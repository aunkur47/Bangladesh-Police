import{k as e}from"./promiseUtils-CuvCeJz2.js";import{h as t,s as n}from"./enums-CsvnPRfA.js";import{d as r,l as i}from"./WGLContainer-CCZKk9KN.js";import{r as a,t as o}from"./Texture-DDP8SCQ7.js";import{t as s}from"./VertexArrayObject-C4AatcZ0.js";import{t as c}from"./VertexBuffer-CYPpuV_3.js";import{t as l}from"./FramebufferObject-BACp_7iv.js";var u=class{constructor(){this._result=!1}dispose(){this._program=e(this._program)}get result(){return this._program!=null&&(this._result=this._test(this._program),this.dispose()),this._result}},d=class extends u{constructor(e){super(),this._rctx=e,this._program=e.programCache.acquire(`
    precision highp float;

    attribute vec2 position;
    varying vec2 v_uv;

    void main() {
      v_uv = position;
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    }
    `,`
    precision highp float;

    varying vec2 v_uv;

    uniform sampler2D u_texture;

    void main() {
      gl_FragColor = texture2D(u_texture, v_uv);
    }
    `,i)}dispose(){super.dispose()}_test(e){let i=this._rctx;if(!i.gl)return e.dispose(),!0;let u=new a(1);u.wrapMode=33071,u.samplingMode=9728;let d=new l(i,u),p=new c(i,r,new Uint16Array([0,0,1,0,0,1,1,1])),m=new s(i,p),h=new a;h.samplingMode=9729,h.wrapMode=33071;let g=new o(i,h,f);i.useProgram(e),i.bindTexture(g,0),e.setUniform1i(`u_texture`,0);let _=i.getBoundFramebufferObject(),{x:v,y,width:b,height:x}=i.getViewport();i.bindFramebuffer(d),i.setViewport(0,0,1,1),i.setClearColor(0,0,0,0),i.setBlendingEnabled(!1),i.clear(16384),i.bindVAO(m),i.drawArrays(t.TRIANGLE_STRIP,0,4);let S=new Uint8Array(4);return d.readPixels(0,0,1,1,6408,n.UNSIGNED_BYTE,S),m.dispose(),d.dispose(),g.dispose(),i.setViewport(v,y,b,x),i.bindFramebuffer(_),S[0]!==255}},f=new Image;f.src=`data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='5' height='5' version='1.1' viewBox='0 0 5 5' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23f00' fill-opacity='.5'/%3E%3C/svg%3E%0A`,f.width=5,f.height=5,f.decode();var p=class{constructor(e,t,n,r,i,a,o,s,c){this.createQuery=e,this.deleteQuery=t,this.resultAvailable=n,this.getResult=r,this.disjoint=i,this.beginTimeElapsed=a,this.endTimeElapsed=o,this.createTimestamp=s,this.timestampBits=c}},m=!1;function h(e,t){if(t.disjointTimerQuery)return null;let n=e.getExtension(`EXT_disjoint_timer_query_webgl2`);return n?new p(()=>e.createQuery(),t=>{e.deleteQuery(t),m=!1},t=>e.getQueryParameter(t,e.QUERY_RESULT_AVAILABLE),t=>e.getQueryParameter(t,e.QUERY_RESULT),()=>e.getParameter(n.GPU_DISJOINT_EXT),t=>{m||(m=!0,e.beginQuery(n.TIME_ELAPSED_EXT,t))},()=>{e.endQuery(n.TIME_ELAPSED_EXT),m=!1},e=>n.queryCounterEXT(e,n.TIMESTAMP_EXT),()=>e.getQuery(n.TIMESTAMP_EXT,n.QUERY_COUNTER_BITS_EXT)):(n=e.getExtension(`EXT_disjoint_timer_query`),n?new p(()=>n.createQueryEXT(),e=>{n.deleteQueryEXT(e),m=!1},e=>n.getQueryObjectEXT(e,n.QUERY_RESULT_AVAILABLE_EXT),e=>n.getQueryObjectEXT(e,n.QUERY_RESULT_EXT),()=>e.getParameter(n.GPU_DISJOINT_EXT),e=>{m||(m=!0,n.beginQueryEXT(n.TIME_ELAPSED_EXT,e))},()=>{n.endQueryEXT(n.TIME_ELAPSED_EXT),m=!1},e=>n.queryCounterEXT(e,n.TIMESTAMP_EXT),()=>n.getQueryEXT(n.TIMESTAMP_EXT,n.QUERY_COUNTER_BITS_EXT)):null)}export{d as n,u as r,h as t};