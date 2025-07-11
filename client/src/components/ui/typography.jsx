/* eslint-disable react/prop-types */
import React from 'react'

export function TypographyH1({ children, className = '' }) {
    return (
        <h1 className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className}`}>
            {children}
        </h1>
    )
}

export function TypographyH2({ children, className = '' }) {
    return (
        <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}>
            {children}
        </h2>
    )
}

export function TypographyH3({ children, className = '' }) {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}>
            {children}
        </h3>
    )
}

export function TypographyH4({ children, className = '' }) {
    return (
        <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}>
            {children}
        </h4>
    )
}

export function TypographyP({ children, className = '' }) {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
            {children}
        </p>
    )
}

export function TypographyBlockquote({ children, className = '' }) {
    return (
        <blockquote className={`mt-6 border-l-2 pl-6 italic ${className}`}>
            {children}
        </blockquote>
    )
}

export function TypographyList({ children, className = '' }) {
    return (
        <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className}`}>
            {children}
        </ul>
    )
}

export function TypographyInlineCode({ children, className = '' }) {
    return (
        <code className={`bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}>
            {children}
        </code>
    )
}

export function TypographyLead({ children, className = '' }) {
    return (
        <p className={`text-muted-foreground text-xl ${className}`}>
            {children}
        </p>
    )
}

export function TypographyLarge({ children, className = '' }) {
    return <div className={`text-lg font-semibold ${className}`}>{children}</div>
}

export function TypographySmall({ children, className = '' }) {
    return (
        <small className={`flex-1 text-sm leading-none text-start font-medium ${className}`}>{children}</small>
    )
}

export function TypographyMuted({ children, className = '' }) {
    return (
        <p className={`text-muted-foreground text-sm ${className}`}>{children}</p>
    )
}
