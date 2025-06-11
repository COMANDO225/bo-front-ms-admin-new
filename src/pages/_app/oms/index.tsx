import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/oms/')({
    beforeLoad: () => {
        throw redirect({
            to: '/oms/dashboard',
        })
    },
})