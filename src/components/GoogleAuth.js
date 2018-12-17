import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load('client:auth', () => {
			window.gapi.client
				.init({
					clientId:
						'651368643326-u2a17honv61qqr1b14muqma47sf3fbbh.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();

					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}
	//this.auth.currentUser.get().getBasicProfile() refers to signed in user's information

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			const currentUser = this.auth.currentUser.get();
			const imgUrl = currentUser.getBasicProfile().getImageUrl();
			const userId = currentUser.getId();
			const userName = currentUser.getBasicProfile().getGivenName();

			this.props.signIn(userId, userName, imgUrl);
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button
					onClick={this.onSignOutClick}
					className="ui small red google button"
				>
					<i className="google icon" />
					Hello, {this.props.userName} Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Signin with Google
				</button>
			);
		}
	}
	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		isSignedIn: state.auth.isSignedIn,
		userName: state.auth.userName,
		imgUrl: state.auth.imgUrl
	};
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);
