function verify_privilege(object, privileges_list){

	privileges_list.map((privilege_name) => {

		if ( privilege_name === 'Basic' ){

			object.props.allow_basic_privilege()

		} else if ( privilege_name === 'Posts Interaction' ){

			object.props.allow_posts_interaction_privilege()

		} else if ( privilege_name === 'Posts Creation' ){

			object.props.allow_posts_creation_privilege()

		} else if ( privilege_name === 'Ads Creation' ){

			object.props.allow_ads_creation_privilege()

		} else if ( privilege_name === 'Books Creation' ){

			object.props.allow_books_creation_privilege()

		} else if ( privilege_name === 'Pages Creation' ){

			object.props.allow_pages_creation_privilege()

		} else if ( privilege_name === 'Sports Creation' ){

			object.props.allow_sports_creation_privilege()




		} else  if ( privilege_name === 'Revoke Basic' ){

			object.props.revoke_basic_privilege()

		} else if  ( privilege_name === 'Revoke Posts Interaction' ){

			object.props.revoke_posts_interaction_privilege()

		} else if  ( privilege_name === 'Revoke Posts Creation' ){

			object.props.revoke_posts_creation_privilege()

		} else if  ( privilege_name === 'Revoke Ads Creation' ){

			object.props.revoke_ads_creation_privilege()

		} else if  ( privilege_name === 'Revoke Books Creation' ){

			object.props.revoke_books_creation_privilege()

		} else if  ( privilege_name === 'Revoke Pages Creation' ){

			object.props.revoke_pages_creation_privilege()

		} else if  ( privilege_name === 'Revoke Sports Creation' ){

			object.props.revoke_sports_creation_privilege()

		} else {
		}

	})

}

module.exports = verify_privilege