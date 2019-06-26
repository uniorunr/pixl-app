import React from 'react';
import './UserInfo.scss';
import PropTypes from 'prop-types';
import FireBase from '../../../firebase/firebase';

const logout = async () => {
  await FireBase.logout();
};

const UserInfo = ({ src }) => (
  <div className="user-info">
    <img
      className="user-info__avatar"
      src={src}
      alt="User avatar"
      width={27}
      height={27}
    />
    <button className="user-info__sign-out" type="button" onClick={logout}>
      <i className="fas fa-sign-out-alt" />
    </button>
  </div>
);

UserInfo.propTypes = {
  src: PropTypes.string.isRequired,
};

export default UserInfo;
