
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import {

	RootRouterContainer,

	SocialPostContainer,
	IndividualSocialPost,
	BookContainer,
	IndividualBook,
	SportContainer,
	IndividualSport,	
	LoginContainer,

} from "../containers";


import {
	CreateSocialPost,
	ComponentForShowingSocialPost,
	SocialPostCard,
} from "../components/socialposts"

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
	CreateComment,
} from "../components/comments"

import {
	CreateLike,
} from "../components/likes"

import {
	CreateShare,
} from "../components/shares"

export const ConnectedRootRouterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RootRouterContainer);

export const ConnectedLoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);


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

export const ConnectedCreateComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateComment);

export const ConnectedCreateLike = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateLike);

export const ConnectedCreateShare = connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateShare);

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

export const ConnectedSocialPostContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SocialPostContainer);



export const ConnectedIndividualBook = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBook);

export const ConnectedBookContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BookContainer);



export const ConnectedIndividualSport = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualSport);

export const ConnectedSportContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SportContainer);

