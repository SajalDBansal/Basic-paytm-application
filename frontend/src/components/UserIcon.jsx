export const UserIcon = ({ name }) => {
    return (
        <div className="flex justify-center mr-4 h-10 w-10 bg-slate-200 rounded-full mt-2 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
                {name[0]}
            </div>
        </div>
    )
}