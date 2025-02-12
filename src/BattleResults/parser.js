export class PyNativeParser {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }

    parse() {
        return this.parseValue();
    }

    parseValue() {
        this.skipWhitespace();
        
        // Check for constructor pattern
        if (/^[A-Z][a-zA-Z0-9_]*\s*\(/.test(this.input.slice(this.pos))) {
            return this.parseConstructor();
        }
        
        // Handle different Rust literal types
        switch(this.peek()) {
            case 'b':
                if (this.peek(1) === '"' || this.peek(1) === "'") {
                    return this.parseBString();
                }
                break;
            case '"':
            case "'":
                return this.parseQuotedString();
            case '[':
                return this.parseArray();
            case '{':
                return this.parseDict();
            case '<':
                return this.parseEnum();
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
            case '-':
                return this.parseNumber();
            case 'F':
                if (this.matchKeyword('False')) return false;
                break;
            case 'T':
                if (this.matchKeyword('True')) return true;
                break;
        }
        
        // Try to parse identifier if nothing else matches
        if (/[a-zA-Z_]/.test(this.peek())) {
            return this.parseIdentifier();
        }
        
        throw new Error(`Unexpected character '${this.peek()}' at position ${this.pos}`);
    }

    parseConstructor() {
        // Parse type name
        let typeName = '';
        while (this.pos < this.input.length && /[A-Za-z0-9_]/.test(this.peek())) {
            typeName += this.input[this.pos++];
        }
        
        this.skipWhitespace();
        this.expect('(');
        
        // Parse the value inside constructor
        const value = this.parseValue();
        
        this.skipWhitespace();
        this.expect(')');
        
        return {
            type: typeName,
            value: value
        };
    }

    parseEnum() {
        this.expect('<');
        const enumName = this.parseIdentifier();
        this.expect('.');
        const variant = this.parseIdentifier();
        this.expect(':');
        this.skipWhitespace();
        const value = this.parseValue();
        this.expect('>');
        return {
            type: enumName,
            variant: variant,
            value: value
        };
    }

    parseBString() {
        this.expect('b');
        const quoteChar = this.peek();
        this.pos++;
        
        let matches = this.input.substr(this.pos).match("^.*?(?<!\\\\)(?=" + quoteChar + "[,\\]\\}\\)])");
        
        if( !matches ) {
            throw new Error(`Can't find end of b-string at ${this.pos}`);
        }
        
        this.pos += matches[0].length + 1;
        return new Uint8Array(matches[0].split('').map(char => char.charCodeAt(0)));
    }

    parseQuotedString() {
        const quoteChar = this.peek();
        this.pos++;
        let result = '';
        
        while (this.pos < this.input.length) {
            if (this.peek() === quoteChar && this.input[this.pos - 1] !== '\\') {
                this.pos++;
                break;
            }
            
            if (this.peek() === '\\') {
                this.pos++;
                switch(this.peek()) {
                    case 'n': result += '\n'; break;
                    case 'r': result += '\r'; break;
                    case 't': result += '\t'; break;
                    case '\\': result += '\\'; break;
                    case '"': result += '"'; break;
                    case "'": result += "'"; break;
                    default:
                        result += this.peek();
                }
            } else {
                result += this.input[this.pos];
            }
            this.pos++;
        }
        
        return result;
    }

    parseDict() {
        this.expect('{');
        const result = {};
        
        while (this.pos < this.input.length) {
            this.skipWhitespace();
            if (this.peek() === '}') {
                this.pos++;
                break;
            }
            
            // Parse key (quoted or identifier)
            let key;
            if (this.peek() === "'" || this.peek() === '"') {
                key = this.parseQuotedString();
            } else {
                key = this.parseIdentifier();
            }
            
            this.skipWhitespace();
            this.expect(':');
            this.skipWhitespace();
            const value = this.parseValue();
            result[key] = value;
            
            this.skipWhitespace();
            if (this.peek() === ',') {
                this.pos++;
            }
        }
        
        return result;
    }

    parseArray() {
        this.expect('[');
        const result = [];
        
        while (this.pos < this.input.length) {
            this.skipWhitespace();
            if (this.peek() === ']') {
                this.pos++;
                break;
            }
            
            result.push(this.parseValue());
            
            this.skipWhitespace();
            if (this.peek() === ',') {
                this.pos++;
            }
        }
        
        return result;
    }

    parseNumber() {
        let numStr = '';
        while (this.pos < this.input.length && /[-0-9.]/.test(this.peek())) {
            numStr += this.input[this.pos++];
        }
        return Number(numStr);
    }

    parseIdentifier() {
        let identifier = '';
        while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(this.peek())) {
            identifier += this.input[this.pos++];
        }
        return identifier;
    }

    matchKeyword(keyword) {
        if (this.input.substr(this.pos, keyword.length) === keyword) {
            this.pos += keyword.length;
            return true;
        }
        return false;
    }

    peek(offset = 0) {
        return this.input[this.pos + offset];
    }

    expect(str) {
        if (this.input.substr(this.pos, str.length) !== str) {
            throw new Error(`Expected "${str}" at position ${this.pos}`);
        }
        this.pos += str.length;
    }

    skipWhitespace() {
        while (this.pos < this.input.length && /\s/.test(this.peek())) {
            this.pos++;
        }
    }
}