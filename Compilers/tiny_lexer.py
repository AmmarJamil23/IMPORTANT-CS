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
            ident = code[start:i]
            if ident == "print":
                tokens.append(("PRINT", ident))
            else:
                tokens.append(("IDENT", ident))

        elif c.isdigit():
            start = i
            while i < len(code) and code[i].isdigit():
                i += 1
            tokens.append(("NUMBER", int(code[start:i])))

        elif c == "+":
            tokens.append(("PLUS", "+"))
            i += 1

        elif c == "*":
            tokens.append(("MULT", "*"))
            i += 1

        elif c == "=":
            tokens.append(("EQUAL", "="))
            i += 1

        elif c == "(":
            tokens.append(("LPAREN", "("))
            i += 1

        elif c == ")":
            tokens.append(("RPAREN", ")"))
            i += 1

        else:
            raise ValueError("Unknown character: " + c)

    return tokens
