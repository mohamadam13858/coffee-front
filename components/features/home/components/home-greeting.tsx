export function HomeGreeting({ firstName }: { firstName?: string | null }) {
    const name = firstName?.trim();

    return (
        <section
            className="
                rounded-3xl
                border
                border-neutral-800/70
                bg-gradient-to-l
                from-amber-500/10
                to-white/[0.03]
                px-6
                py-5
            "
        >
            <p className="text-sm text-neutral-400">سلام</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-white">
                {name ? `${name} عزیز` : "خوش آمدید"}
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
                میزت را مشخص کن تا سفارش از همان جا ثبت شود
            </p>
        </section>
    );
}
