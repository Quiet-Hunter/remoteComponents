!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("React"));else if("function"==typeof define&&define.amd)define(["React"],t);else{var s="object"==typeof exports?t(require("React")):t(e.React);for(var r in s)("object"==typeof exports?exports:e)[r]=s[r]}}(this,(e=>(()=>{"use strict";var t={452:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(s(883));t.default=function(e){var t=e.data;return a.default.createElement("div",null,a.default.createElement("h1",null,"Battle Results"),t.common.teams.map((function(e,t){return r=t,i=(s=e).scores,n=s.players,a.default.createElement("div",{key:r},a.default.createElement("h2",null,"Team ",r+1," - Score: ",i),a.default.createElement("table",null,a.default.createElement("thead",null,a.default.createElement("tr",null,a.default.createElement("th",null,"User Name"),a.default.createElement("th",null,"Role"),a.default.createElement("th",null,"Level"),a.default.createElement("th",null,"Team"),a.default.createElement("th",null,"Damage"),a.default.createElement("th",null,"Kills"),a.default.createElement("th",null,"Deaths"),a.default.createElement("th",null,"Healing"))),a.default.createElement("tbody",null,Object.entries(n).map((function(e){var t=e[0];return function(e,t){var s=e.player_info,r=s.user_name,i=s.role,n=s.level,p=s.team,o=e.stats,u=o.damage,h=o.frags,l=o.deaths,c=o.heal;return a.default.createElement("tr",{key:t},a.default.createElement("td",null,r),a.default.createElement("td",null,i),a.default.createElement("td",null,n),a.default.createElement("td",null,p),a.default.createElement("td",null,u),a.default.createElement("td",null,h),a.default.createElement("td",null,l),a.default.createElement("td",null,c))}(e[1],t)})))));var s,r,i,n})))}},653:function(e,t,s){var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,s=1,r=arguments.length;s<r;s++)for(var a in t=arguments[s])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},r.apply(this,arguments)},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(s(883)),n=a(s(452)),p=s(818);t.default=function(e){console.log(e);var t=e.json;return t.hasOwnProperty("extra")&&(t=r(r({},t),JSON.parse(t.extra))),t.hasOwnProperty("_message")&&t.message.endsWith("messages.accounts.arena.request.Results")?i.default.createElement(n.default,{data:(0,p.parse)(t._message)}):i.default.createElement("span",{color:"red"},"Wrong format: ",JSON.stringify(t))}},818:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.parse=function(e){try{return new s(e).parseValue()}catch(t){throw console.log("Couldn't parse Rust object",e),t}};var s=function(){function e(e){this.input=e,this.pos=0}return e.prototype.parse=function(){return this.parseValue()},e.prototype.parseValue=function(){if(this.skipWhitespace(),/^[A-Z][a-zA-Z0-9_]*\s*\(/.test(this.input.slice(this.pos)))return this.parseConstructor();switch(this.peek()){case"b":if('"'===this.peek(1)||"'"===this.peek(1))return this.parseBString();break;case'"':case"'":return this.parseQuotedString();case"[":return this.parseArray();case"{":return this.parseDict();case"<":return this.parseEnum();case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":case"-":return this.parseNumber();case"F":if(this.matchKeyword("False"))return!1;break;case"T":if(this.matchKeyword("True"))return!0}if(/[a-zA-Z_]/.test(this.peek()))return this.parseIdentifier();throw new Error("Unexpected character '".concat(this.peek(),"' at position ").concat(this.pos))},e.prototype.parseConstructor=function(){for(var e="";this.pos<this.input.length&&/[A-Za-z0-9_]/.test(this.peek());)e+=this.input[this.pos++];this.skipWhitespace(),this.expect("(");var t=this.parseValue();return this.skipWhitespace(),this.expect(")"),{type:e,value:t}},e.prototype.parseEnum=function(){this.expect("<");var e=this.parseIdentifier();this.expect(".");var t=this.parseIdentifier();this.expect(":"),this.skipWhitespace();var s=this.parseValue();return this.expect(">"),{type:e,variant:t,value:s}},e.prototype.parseBString=function(){this.expect("b");var e=this.peek();this.pos++;var t=this.input.substr(this.pos).match("^.*?(?<!\\\\)(?="+e+"[,\\]\\}\\)])");if(!t)throw new Error("Can't find end of b-string at ".concat(this.pos));return this.pos+=t[0].length+1,new Uint8Array(t[0].split("").map((function(e){return e.charCodeAt(0)})))},e.prototype.parseQuotedString=function(){var e=this.peek();this.pos++;for(var t="";this.pos<this.input.length;){if(this.peek()===e&&"\\"!==this.input[this.pos-1]){this.pos++;break}if("\\"===this.peek())switch(this.pos++,this.peek()){case"n":t+="\n";break;case"r":t+="\r";break;case"t":t+="\t";break;case"\\":t+="\\";break;case'"':t+='"';break;case"'":t+="'";break;default:t+=this.peek()}else t+=this.input[this.pos];this.pos++}return t},e.prototype.parseDict=function(){this.expect("{");for(var e={};this.pos<this.input.length;){if(this.skipWhitespace(),"}"===this.peek()){this.pos++;break}var t;t="'"===this.peek()||'"'===this.peek()?this.parseQuotedString():this.parseIdentifier(),this.skipWhitespace(),this.expect(":"),this.skipWhitespace();var s=this.parseValue();e[t]=s,this.skipWhitespace(),","===this.peek()&&this.pos++}return e},e.prototype.parseArray=function(){this.expect("[");for(var e=[];this.pos<this.input.length;){if(this.skipWhitespace(),"]"===this.peek()){this.pos++;break}e.push(this.parseValue()),this.skipWhitespace(),","===this.peek()&&this.pos++}return e},e.prototype.parseNumber=function(){for(var e="";this.pos<this.input.length&&/[-0-9.]/.test(this.peek());)e+=this.input[this.pos++];return Number(e)},e.prototype.parseIdentifier=function(){for(var e="";this.pos<this.input.length&&/[a-zA-Z0-9_]/.test(this.peek());)e+=this.input[this.pos++];return e},e.prototype.matchKeyword=function(e){return this.input.substr(this.pos,e.length)===e&&(this.pos+=e.length,!0)},e.prototype.peek=function(e){return void 0===e&&(e=0),this.input[this.pos+e]},e.prototype.expect=function(e){if(this.input.substr(this.pos,e.length)!==e)throw new Error('Expected "'.concat(e,'" at position ').concat(this.pos));this.pos+=e.length},e.prototype.skipWhitespace=function(){for(;this.pos<this.input.length&&/\s/.test(this.peek());)this.pos++},e}();t.default=s},883:t=>{t.exports=e}},s={};return function e(r){var a=s[r];if(void 0!==a)return a.exports;var i=s[r]={exports:{}};return t[r].call(i.exports,i,i.exports,e),i.exports}(653)})()));