import { AvatarDemo } from '@/components/AvatarDemo'
import { useAuth } from '@/supabase/authContext'

const Settings = () => {
    const { currentUser } = useAuth()

    if (!currentUser) return null // or a loader

    return (
        <div className='h-auto flex bg-white/20 items-center p-2 rounded-lg'>
            <AvatarDemo />
            <div className='flex flex-col min-w-0 py-1 px-4 gap-0.5 justify-center'>
                <h1 className="truncate text-sm font-bold text-slate-800" title={currentUser.user_metadata?.username || currentUser.email.split("@")[0]}>
                    {currentUser.user_metadata?.username || currentUser.email.split("@")[0]}
                </h1>
                <p className="truncate text-xs text-slate-500" title={currentUser.email}>
                    {currentUser.email}
                </p>
            </div>
        </div>
    )
}

export default Settings
