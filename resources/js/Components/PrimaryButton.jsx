export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-12 py-4 bg-rose-600 border border-transparent rounded-full font-semibold text-sm text-white uppercase tracking-widest hover:bg-red-950 focus:bg-red-950 active:bg-red-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
