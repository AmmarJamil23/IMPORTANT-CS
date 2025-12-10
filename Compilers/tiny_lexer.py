
def tokenize(code):
    tokens = []
    i = 0

    while i < len(code):
        c = code[i]

        if c.isspace():
            i += 1
            continue

        elif c.isalpha():
            start = i
            while i < len(code) and code[i].isalnum():
                i += 1
            tokens.append(("IDENT", code[start:i]))

        elif c.isdigit():
            start = i
            while i < len(code) and code[i].isdigit():
                i += 1
            tokens.append(("NUMBER", int(code[start:i])))

        elif c == "+":
            tokens.append(("PLUS", "+"))
            i += 1

        elif c == "-":
            tokens.append(("MINUS", "-"))
            i += 1

        elif c == "*":
            tokens.append(("MULTIPLY", "*"))
            i += 1

        elif c == "/":
            tokens.append(("DIVIDE", "/"))
            i += 1

        elif c == "=":
            tokens.append(("EQUAL", "="))
            i += 1

        elif c == "(":
            tokens.append(("LEFT BRACKET", "("))
            i += 1

        else: 
            raise ValueError("Unexpected character: " + c)

    return tokens

print(tokenize("x = 10 + 20 + 23 / 34+4"))