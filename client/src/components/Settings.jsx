import { AvatarDemo } from '@/components/AvatarDemo'
import { useAuth } from '@/firebase/authContext'

const Settings = () => {
    const { currentUser } = useAuth()

    if (!currentUser) return null // or a loader

    return (
        <div className='h-auto flex  bg-white/20 items-center'>
            <AvatarDemo />
            <div className='flex w-full justify-center bg-transparent flex-col py-2 px-7 flex-wrap gap-1'>
                <h1>{currentUser.displayName}</h1>
                <p className="max-w-[220px] break-words text-sm text-gray-600">
                    mohdtabishkhan001@gmail.com
                </p>
            </div>
        </div>
    )
}

export default Settings
