import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'

// unused
const UserPage = () => {
    const { user } = useAuthContext()
    return (
        <div> {user!.username} </div>
    )
}
export default UserPage