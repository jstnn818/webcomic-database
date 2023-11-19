import { useAuthContext } from '../hooks/useAuthContext'

// unused
const UserPage = () => {
    const { user } = useAuthContext()
    return (
        <div> {user.username} </div>
    )
}
export default UserPage