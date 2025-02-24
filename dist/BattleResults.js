(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var r in s)e.o(s,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:s[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>h});const s=window.React;var r=e.n(s);const i=({data:e})=>r().createElement("div",null,r().createElement("h1",null,"Battle Results"),e.common.teams.map(((e,t)=>((e,t)=>{const{scores:s,players:i}=e;return r().createElement("div",{key:t},r().createElement("h2",null,"Team ",t+1," - Score: ",s),r().createElement("table",null,r().createElement("thead",null,r().createElement("tr",null,r().createElement("th",null,"User Name"),r().createElement("th",null,"Role"),r().createElement("th",null,"Level"),r().createElement("th",null,"Team"),r().createElement("th",null,"Damage"),r().createElement("th",null,"Kills"),r().createElement("th",null,"Deaths"),r().createElement("th",null,"Healing"))),r().createElement("tbody",null,Object.entries(i).map((([e,t])=>((e,t)=>{const{user_name:s,role:i,level:a,team:n}=e.player_info,{damage:h,frags:p,deaths:l,heal:o}=e.stats;return r().createElement("tr",{key:t},r().createElement("td",null,s),r().createElement("td",null,i),r().createElement("td",null,a),r().createElement("td",null,n),r().createElement("td",null,h),r().createElement("td",null,p),r().createElement("td",null,l),r().createElement("td",null,o))})(t,e))))))})(e,t))));class a{input;pos;constructor(e){this.input=e,this.pos=0}parse(){return this.parseValue()}parseValue(){if(this.skipWhitespace(),/^[A-Z][a-zA-Z0-9_]*\s*\(/.test(this.input.slice(this.pos)))return this.parseConstructor();switch(this.peek()){case"b":if('"'===this.peek(1)||"'"===this.peek(1))return this.parseBString();break;case'"':case"'":return this.parseQuotedString();case"[":return this.parseArray();case"{":return this.parseDict();case"<":return this.parseEnum();case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":return this.parseNumber();case"F":if(this.matchKeyword("False"))return!1;break;case"T":if(this.matchKeyword("True"))return!0}if(/[a-zA-Z_]/.test(this.peek()))return this.parseIdentifier();throw new Error(`Unexpected character '${this.peek()}' at position ${this.pos}`)}parseConstructor(){let e="";for(;this.pos<this.input.length&&/[A-Za-z0-9_]/.test(this.peek());)e+=this.input[this.pos++];this.skipWhitespace(),this.expect("(");const t=this.parseValue();return this.skipWhitespace(),this.expect(")"),{type:e,value:t}}parseEnum(){this.expect("<");const e=this.parseIdentifier();this.expect(".");const t=this.parseIdentifier();this.expect(":"),this.skipWhitespace();const s=this.parseValue();return this.expect(">"),{type:e,variant:t,value:s}}parseBString(){this.expect("b");const e=this.peek();this.pos++;let t=this.input.substr(this.pos).match("^.*?(?<!\\\\)(?="+e+"[,\\]\\}\\)])");if(!t)throw new Error(`Can't find end of b-string at ${this.pos}`);return this.pos+=t[0].length+1,new Uint8Array(t[0].split("").map((e=>e.charCodeAt(0))))}parseQuotedString(){const e=this.peek();this.pos++;let t="";for(;this.pos<this.input.length;){if(this.peek()===e&&"\\"!==this.input[this.pos-1]){this.pos++;break}if("\\"===this.peek())switch(this.pos++,this.peek()){case"n":t+="\n";break;case"r":t+="\r";break;case"t":t+="\t";break;case"\\":t+="\\";break;case'"':t+='"';break;case"'":t+="'";break;default:t+=this.peek()}else t+=this.input[this.pos];this.pos++}return t}parseDict(){this.expect("{");const e={};for(;this.pos<this.input.length;){if(this.skipWhitespace(),"}"===this.peek()){this.pos++;break}let t;t="'"===this.peek()||'"'===this.peek()?this.parseQuotedString():this.parseIdentifier(),this.skipWhitespace(),this.expect(":"),this.skipWhitespace();const s=this.parseValue();e[t]=s,this.skipWhitespace(),","===this.peek()&&this.pos++}return e}parseArray(){this.expect("[");const e=[];for(;this.pos<this.input.length;){if(this.skipWhitespace(),"]"===this.peek()){this.pos++;break}e.push(this.parseValue()),this.skipWhitespace(),","===this.peek()&&this.pos++}return e}parseNumber(){let e="";for(;this.pos<this.input.length&&/[-0-9.]/.test(this.peek());)e+=this.input[this.pos++];return Number(e)}parseIdentifier(){let e="";for(;this.pos<this.input.length&&/[a-zA-Z0-9_]/.test(this.peek());)e+=this.input[this.pos++];return e}matchKeyword(e){return this.input.substr(this.pos,e.length)===e&&(this.pos+=e.length,!0)}peek(e=0){return this.input[this.pos+e]}expect(e){if(this.input.substr(this.pos,e.length)!==e)throw new Error(`Expected "${e}" at position ${this.pos}`);this.pos+=e.length}skipWhitespace(){for(;this.pos<this.input.length&&/\s/.test(this.peek());)this.pos++}}function n(e){try{return new a(e).parseValue()}catch(t){throw console.log("Couldn't parse Rust object",e),t}}const h=({json:e})=>(e.hasOwnProperty("extra")&&(e={...e,...JSON.parse(e.extra)}),e.hasOwnProperty("_message")&&e.message.endsWith("messages.accounts.arena.request.Results")?r().createElement(i,{data:n(e._message)}):r().createElement("span",{color:"red"},"Wrong format: ",JSON.stringify(e)));var p=window;for(var l in t)p[l]=t[l];t.__esModule&&Object.defineProperty(p,"__esModule",{value:!0})})();