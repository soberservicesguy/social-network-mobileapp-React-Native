
import { connect } from "react-redux";
import {mapStateToProps, mapDispatchToProps} from "./store_configuration";

import {

	RootRouterContainer,

	BlogPostContainer,
	VideoItemContainer,	RelatedVideoCommentContainer,
	ImageItemContainer,
} from "../containers";


import {


	IndividualBlogPost,
	IndividualVideoItem,	IndividualRelatedVideoComment,
	IndividualImageItem,

} from "../components";

export const ConnectedRootRouterContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RootRouterContainer);



export const ConnectedIndividualBlogPost = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualBlogPost);

export const ConnectedBlogPostContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BlogPostContainer);



export const ConnectedIndividualVideoItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualVideoItem);

export const ConnectedVideoItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(VideoItemContainer);



export const ConnectedIndividualImageItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualImageItem);

export const ConnectedImageItemContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageItemContainer);



export const ConnectedIndividualRelatedVideoComment = connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualRelatedVideoComment);



export const ConnectedRelatedVideoCommentContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RelatedVideoCommentContainer);

