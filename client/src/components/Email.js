import React, { useContext, createRef } from "react";
import styled from 'styled-components';

import { AppContext } from './AppContext';

function Email({ created }) {
  const {
    appUser,
    createUserWithEmail,
    signInWithEmail,
    handleSignOut,
  } = useContext(AppContext);

  console.log(appUser);

  const emailInput = createRef();
  const passwordInput = createRef();

  const submitForm = event => {
    event.preventDefault();

    if (created) {
      signInWithEmail(emailInput.current.value, passwordInput.current.value);
    }
    else {
      createUserWithEmail(emailInput.current.value, passwordInput.current.value);
    }
  }

  return (
    <StyledPageWrapper>
      <StyledForm
        onSubmit={submitForm}
      >
        <input type="email" ref={emailInput} required />
        <input type="password" ref={passwordInput} required />
        <button>{created ? 'Sign In' : 'Create Account'}</button>
      </StyledForm>
      {created && (
        <button
          onClick={handleSignOut}
        >
          {appUser.email} Sign Out
        </button>
      )}
    </StyledPageWrapper>
  )
}

const StyledPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  background: #eaeaea;
  padding: 6px 14px;
  height: 148px;
`;

const StyledUserContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

const StyledContainer = styled.div`
  background: #fafafa;
  min-height: 400px;
  padding: 14px;
`;

export default Email;
