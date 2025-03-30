import PropTypes from 'prop-types';
import EditButton from './EditButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
const CardUser = ({ users }) => {
    return (
        
        users.map((user) => (
            // Hiển thị các giá trị của user theo thứ tự mong muốn
            <div key={user.id} className="grid grid-cols-5 gap-6 mt-2 border rounded-md place-items-center">
                <div key={`id-${user.id}`} className="w-full">
                    <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                        {user.id}
                    </div>
                </div>
                <div key={`name-${user.id}`} className="w-full">
                    <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                        {user.name}
                    </div>
                </div>
                <div key={`email-${user.id}`} className="w-full">
                    <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                        {user.email}
                    </div>
                </div>
                <div key={`createAt-${user.id}`} className="w-full">
                    <div className="px-2 py-3 font-nunito text-gray-800 text-center">
                        {user.createAt}
                    </div>
                </div>
                <EditButton>
                    <FontAwesomeIcon className="text-white" icon={faAngleDown} />
                </EditButton>
                </div>
        ))        
    );
};

CardUser.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            createAt: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default CardUser;
