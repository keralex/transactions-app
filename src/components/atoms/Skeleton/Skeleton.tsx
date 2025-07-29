import type { FC } from 'react'

interface SkeletonProps {
    width?: string
    height?: string
    className?: string
}

export const Skeleton: FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    className = '',
}) => {
    return (
        <div
            className={`animate-pulse bg-border-neutral rounded-[16px] ${className}`}
            style={{ width, height }}
        />
    )
}

