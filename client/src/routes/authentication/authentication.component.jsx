import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SingInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';

const Authentication = () => {
	return (
		<div className='auth-container'>
			<SignUpForm />
			<SingInForm />
		</div>
	);
};

export default Authentication;
