

export default function ShowError({errorString}) {
    return <div className="mt-2">
        <div
            className={`bg-red-100 text-[12px] text-purple-400 p-4 bg-transparent ${errorString.length !== 0 ? "" : "hidden"}`}
            role="alert">
            {errorString}
        </div>
    </div>
}