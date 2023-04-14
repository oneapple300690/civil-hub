import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { className = "", placeholder = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={className}
            placeholder={placeholder}
            ref={input}
        />
    );
});
