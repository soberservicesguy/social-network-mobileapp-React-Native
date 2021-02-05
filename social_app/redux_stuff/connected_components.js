
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import {

	SocialPostScreen,
	IndividualSocialPost,
	AdvertisementScreen,
	IndividualAdvertisement,
	PageScreen,
	IndividualPage,
	BookScreen,
	IndividualBook,
	SportScreen,
	IndividualSport,	
	LoginScreen,
	SignUpScreen,
	FriendsScreen,
	NotificationsScreen,
} from "../screens";

import AppNavigation from '../the_navigation'

import {
	CreateSocialPost,
	ComponentForShowingSocialPost,
	SocialPostCard,
} from "../components/socialposts"

import {
	CreateAdvertisement,
	ComponentForShowingAdvertisement,
	AdvertisementCard,
} from "../components/advertisements"

import {
	CreatePage,
	ComponentForShowingPage,
	PageCard,
} from "../components/pages"

import {
	CreateBook,
	ComponentForShowingBook,
	BookCard,
} from "../components/books"

import {
	CreateSport,
	ComponentForShowingSport,
	SportCard,
} from "../components/sports"

import {
	CreateCommentForSocialpost,
	SummarizeCommentsOfSocialPost,
} from "../components/comments"

import {
	CreateLikeForSocialpost,
	CreateLikeForSport,
	CreateLikeForBook,
	CreateLikeForPage,	
	SummarizeLikesOfBook,
	SummarizeLikesOfPage,
	SummarizeLikesOfSocialPost,
	SummarizeLikesOfSport,
} from "../components/likes"

import {
	CreateShareForSocialpost,
	SummarizeSharesOfSocialPost,
} from "../components/shares"


export const ConnectedSummarizeCommentsOfSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SummarizeCommentsOfSocialPost)


export const ConnectedSummarizeSharesOfSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SummarizeSharesOfSocialPost)

export const ConnectedFriendsScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(FriendsScreen)

export const ConnectedNotificationsScreen = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NotificationsScreen);

export const ConnectedSummarizeLikesOfBook = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SummarizeLikesOfBook);

export const ConnectedSummarizeLikesOfPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeLikesOfPage);

export const ConnectedSummarizeLikesOfSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SummarizeLikesOfSocialPost);

export const ConnectedSummarizeLikesOfSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(SummarizeLikesOfSport);

export const ConnectedAppNavigation = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppNavigation);

export const ConnectedLoginScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);

export const ConnectedSignUpScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen);

export const ConnectedCreateSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSocialPost);

export const ConnectedSocialPostCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SocialPostCard);

export const ConnectedComponentForShowingSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingSocialPost);

export const ConnectedCreateCommentForSocialpost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateCommentForSocialpost);

export const ConnectedCreateLikeForSocialpost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForSocialpost);

export const ConnectedCreateLikeForSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForSport);

export const ConnectedCreateLikeForBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForBook);

export const ConnectedCreateLikeForPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLikeForPage);


export const ConnectedCreateShareForSocialpost = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateShareForSocialpost);

export const ConnectedCreateAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAdvertisement);

export const ConnectedAdvertisementCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvertisementCard);

export const ConnectedComponentForShowingAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingAdvertisement);

export const ConnectedCreatePage = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreatePage);

export const ConnectedPageCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageCard);

export const ConnectedComponentForShowingPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingPage);

export const ConnectedCreateBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateBook);

export const ConnectedBookCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(BookCard);

export const ConnectedComponentForShowingBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingBook);

export const ConnectedCreateSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateSport);

export const ConnectedSportCard = connect(
	mapStateToProps,
	mapDispatchToProps
)(SportCard);

export const ConnectedComponentForShowingSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentForShowingSport);


export const ConnectedIndividualSocialPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualSocialPost);

export const ConnectedSocialPostScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SocialPostScreen);



export const ConnectedIndividualAdvertisement = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualAdvertisement);

export const ConnectedAdvertisementScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvertisementScreen);



export const ConnectedIndividualPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualPage);

export const ConnectedPageScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(PageScreen);



export const ConnectedIndividualBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBook);

export const ConnectedBookScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(BookScreen);



export const ConnectedIndividualSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualSport);

export const ConnectedSportScreen = connect(
	mapStateToProps,
	mapDispatchToProps
)(SportScreen);

