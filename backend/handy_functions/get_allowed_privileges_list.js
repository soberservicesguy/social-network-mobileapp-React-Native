function get_allowed_privileges_list(user_object){

	let privileges_list = [] 
	
	user_object.privileges.map((privilege_object) => {

		if ( privilege_object.privilege_name === 'allow_surfing' ){
	
			privileges_list.push( 'Basic' )

		} else if ( privilege_object.privilege_name === 'allow_interacting_with_others_post' ){

			privileges_list.push( 'Posts Interaction' )

		} else if ( privilege_object.privilege_name === 'allow_post_creating' ){

			privileges_list.push( 'Posts Creation' )

		} else if ( privilege_object.privilege_name === 'allow_ad_creating' ){

			privileges_list.push( 'Ads Creation' )

		} else if ( privilege_object.privilege_name === 'allow_book_creating' ){

			privileges_list.push( 'Books Creation' )

		} else if ( privilege_object.privilege_name === 'allow_page_creating' ){

			privileges_list.push( 'Pages Creation' )

		} else if ( privilege_object.privilege_name === 'allow_sport_creating' ){

			privileges_list.push( 'Sports Creation' )

		} else if ( privilege_object.privilege_name === 'admin_control' ){

			privileges_list.push( 'Basic' )
			privileges_list.push( 'Posts Interaction' )
			privileges_list.push( 'Posts Creation' )
			privileges_list.push( 'Ads Creation' )
			privileges_list.push( 'Books Creation' )
			privileges_list.push( 'Pages Creation' )
			privileges_list.push( 'Sports Creation' )

		} else {
		}

	})

// add revoked or privileges that are not given
	if ( !privileges_list.includes('Basic') ){

	// not needed to revoke basic
		// privileges_list.push('Revoke Basic')
	
	} 

	if ( !privileges_list.includes('Posts Interaction') ){

		privileges_list.push('Revoke Posts Interaction')

	} 

	if ( !privileges_list.includes('Posts Creation') ){

		privileges_list.push('Revoke Posts Creation')

	} 

	if ( !privileges_list.includes('Ads Creation') ){

		privileges_list.push('Revoke Ads Creation')

	} 

	if ( !privileges_list.includes('Books Creation') ){

		privileges_list.push('Revoke Books Creation')

	} 

	if ( !privileges_list.includes('Pages Creation') ){

		privileges_list.push('Revoke Pages Creation')

	} 

	if ( !privileges_list.includes('Sports Creation') ){

		privileges_list.push('Revoke Sports Creation')

	} 

	return privileges_list
}

module.exports = get_allowed_privileges_list