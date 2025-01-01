import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogout } from './useLogout';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

function Logout() {
    const { isLoading, logout } = useLogout();
    return (
        <ButtonIcon onClick={logout} disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </ButtonIcon>
    )
}

export default Logout