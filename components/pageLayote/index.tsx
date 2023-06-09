type PageProps = {
    children: JSX.Element | JSX.Element[] | string,
    className?: string
}

export function PageLayout({children, className}:PageProps) {
    return (
        <div
        className={`
        bg-background text-text
        w-screen min-h-screen
        p-[30px]
        ${className}
        `}
        >
            {children}
        </div>
    )
}