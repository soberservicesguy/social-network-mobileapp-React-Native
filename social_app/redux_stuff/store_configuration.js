
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import { connect } from "react-redux";
import { combineReducers } from 'redux'; 


// IMPORT rootSaga
import {rootSaga} from "../saga_stuff/saga_combined";

import {
	reducerJWT,
	reducerForBlogPost,
	reducerForRelatedPost,
	reducerForRelatedBlogPostComment,
	reducerForVideoItem,
	reducerForRelatedVideo,
	reducerForRelatedVideoComment,
	reducerForImageItem,
	reducerForRelatedImageComment,
} from "./reducers"

export const rootReducer = combineReducers({
	blogposts: reducerForBlogPost,
	relatedposts: reducerForRelatedPost,
	relatedblogpostcomments: reducerForRelatedBlogPostComment,
	videoitems: reducerForVideoItem,
	relatedvideos: reducerForRelatedVideo,
	relatedvideocomments: reducerForRelatedVideoComment,
	imageitems: reducerForImageItem,
	relatedimagecomments: reducerForRelatedImageComment,
});

export const mapStateToProps = state => {
  return {

	total_blogposts: state.blogposts.totalBlogPost,
	current_blogpost: state.blogposts.currentBlogPost,

	total_relatedposts: state.relatedposts.totalRelatedPost,
	current_relatedpost: state.relatedposts.currentRelatedPost,

	total_relatedblogpostcomments: state.relatedblogpostcomments.totalRelatedBlogPostComment,
	current_relatedblogpostcomment: state.relatedblogpostcomments.currentRelatedBlogPostComment,

	total_videoitems: state.videoitems.totalVideoItem,
	current_videoitem: state.videoitems.currentVideoItem,

	total_relatedvideos: state.relatedvideos.totalRelatedVideo,
	current_relatedvideo: state.relatedvideos.currentRelatedVideo,

	total_relatedvideocomments: state.relatedvideocomments.totalRelatedVideoComment,
	current_relatedvideocomment: state.relatedvideocomments.currentRelatedVideoComment,

	total_imageitems: state.imageitems.totalImageItem,
	current_imageitem: state.imageitems.currentImageItem,

	total_relatedimagecomments: state.relatedimagecomments.totalRelatedImageComment,
	current_relatedimagecomment: state.relatedimagecomments.currentRelatedImageComment,

	};
};

export const mapDispatchToProps = dispatch => {
	return {

		add_blogpost: (blogpost_object) => dispatch( { type: "ADD_BlogPost", blogpost_object: blogpost_object } ),
		remove_blogpost: (blogpost_id) => dispatch( { type: "REMOVE_BlogPost", blogpost_id: blogpost_id } ),
		set_fetched_blogposts: (blogpost_list) => dispatch( { type: "SET_FETCHED_BlogPost", blogpost_list: blogpost_list } ),
		set_fetched_10_more_blogpost: (blogpost_list) => dispatch( { type: "SET_FETCHED_10_MORE_BlogPost", blogpost_list: blogpost_list } ),
		set_current_blogpost: (current_blogpost) => dispatch( { type: "SET_CURRENT_BlogPost", current_blogpost:current_blogpost } ),

		add_relatedpost: (relatedpost_object) => dispatch( { type: "ADD_RelatedPost", relatedpost_object: relatedpost_object } ),
		remove_relatedpost: (relatedpost_id) => dispatch( { type: "REMOVE_RelatedPost", relatedpost_id: relatedpost_id } ),
		set_fetched_relatedposts: (relatedpost_list) => dispatch( { type: "SET_FETCHED_RelatedPost", relatedpost_list: relatedpost_list } ),
		set_fetched_10_more_relatedpost: (relatedpost_list) => dispatch( { type: "SET_FETCHED_10_MORE_RelatedPost", relatedpost_list: relatedpost_list } ),
		set_current_relatedpost: (current_relatedpost) => dispatch( { type: "SET_CURRENT_RelatedPost", current_relatedpost:current_relatedpost } ),

		add_relatedblogpostcomment: (relatedblogpostcomment_object) => dispatch( { type: "ADD_RelatedBlogPostComment", relatedblogpostcomment_object: relatedblogpostcomment_object } ),
		remove_relatedblogpostcomment: (relatedblogpostcomment_id) => dispatch( { type: "REMOVE_RelatedBlogPostComment", relatedblogpostcomment_id: relatedblogpostcomment_id } ),
		set_fetched_relatedblogpostcomments: (relatedblogpostcomment_list) => dispatch( { type: "SET_FETCHED_RelatedBlogPostComment", relatedblogpostcomment_list: relatedblogpostcomment_list } ),
		set_fetched_10_more_relatedblogpostcomment: (relatedblogpostcomment_list) => dispatch( { type: "SET_FETCHED_10_MORE_RelatedBlogPostComment", relatedblogpostcomment_list: relatedblogpostcomment_list } ),
		set_current_relatedblogpostcomment: (current_relatedblogpostcomment) => dispatch( { type: "SET_CURRENT_RelatedBlogPostComment", current_relatedblogpostcomment:current_relatedblogpostcomment } ),

		add_videoitem: (videoitem_object) => dispatch( { type: "ADD_VideoItem", videoitem_object: videoitem_object } ),
		remove_videoitem: (videoitem_id) => dispatch( { type: "REMOVE_VideoItem", videoitem_id: videoitem_id } ),
		set_fetched_videoitems: (videoitem_list) => dispatch( { type: "SET_FETCHED_VideoItem", videoitem_list: videoitem_list } ),
		set_fetched_10_more_videoitem: (videoitem_list) => dispatch( { type: "SET_FETCHED_10_MORE_VideoItem", videoitem_list: videoitem_list } ),
		set_current_videoitem: (current_videoitem) => dispatch( { type: "SET_CURRENT_VideoItem", current_videoitem:current_videoitem } ),

		add_relatedvideo: (relatedvideo_object) => dispatch( { type: "ADD_RelatedVideo", relatedvideo_object: relatedvideo_object } ),
		remove_relatedvideo: (relatedvideo_id) => dispatch( { type: "REMOVE_RelatedVideo", relatedvideo_id: relatedvideo_id } ),
		set_fetched_relatedvideos: (relatedvideo_list) => dispatch( { type: "SET_FETCHED_RelatedVideo", relatedvideo_list: relatedvideo_list } ),
		set_fetched_10_more_relatedvideo: (relatedvideo_list) => dispatch( { type: "SET_FETCHED_10_MORE_RelatedVideo", relatedvideo_list: relatedvideo_list } ),
		set_current_relatedvideo: (current_relatedvideo) => dispatch( { type: "SET_CURRENT_RelatedVideo", current_relatedvideo:current_relatedvideo } ),

		add_relatedvideocomment: (relatedvideocomment_object) => dispatch( { type: "ADD_RelatedVideoComment", relatedvideocomment_object: relatedvideocomment_object } ),
		remove_relatedvideocomment: (relatedvideocomment_id) => dispatch( { type: "REMOVE_RelatedVideoComment", relatedvideocomment_id: relatedvideocomment_id } ),
		set_fetched_relatedvideocomments: (relatedvideocomment_list) => dispatch( { type: "SET_FETCHED_RelatedVideoComment", relatedvideocomment_list: relatedvideocomment_list } ),
		set_fetched_10_more_relatedvideocomment: (relatedvideocomment_list) => dispatch( { type: "SET_FETCHED_10_MORE_RelatedVideoComment", relatedvideocomment_list: relatedvideocomment_list } ),
		set_current_relatedvideocomment: (current_relatedvideocomment) => dispatch( { type: "SET_CURRENT_RelatedVideoComment", current_relatedvideocomment:current_relatedvideocomment } ),

		add_imageitem: (imageitem_object) => dispatch( { type: "ADD_ImageItem", imageitem_object: imageitem_object } ),
		remove_imageitem: (imageitem_id) => dispatch( { type: "REMOVE_ImageItem", imageitem_id: imageitem_id } ),
		set_fetched_imageitems: (imageitem_list) => dispatch( { type: "SET_FETCHED_ImageItem", imageitem_list: imageitem_list } ),
		set_fetched_10_more_imageitem: (imageitem_list) => dispatch( { type: "SET_FETCHED_10_MORE_ImageItem", imageitem_list: imageitem_list } ),
		set_current_imageitem: (current_imageitem) => dispatch( { type: "SET_CURRENT_ImageItem", current_imageitem:current_imageitem } ),

		add_relatedimagecomment: (relatedimagecomment_object) => dispatch( { type: "ADD_RelatedImageComment", relatedimagecomment_object: relatedimagecomment_object } ),
		remove_relatedimagecomment: (relatedimagecomment_id) => dispatch( { type: "REMOVE_RelatedImageComment", relatedimagecomment_id: relatedimagecomment_id } ),
		set_fetched_relatedimagecomments: (relatedimagecomment_list) => dispatch( { type: "SET_FETCHED_RelatedImageComment", relatedimagecomment_list: relatedimagecomment_list } ),
		set_fetched_10_more_relatedimagecomment: (relatedimagecomment_list) => dispatch( { type: "SET_FETCHED_10_MORE_RelatedImageComment", relatedimagecomment_list: relatedimagecomment_list } ),
		set_current_relatedimagecomment: (current_relatedimagecomment) => dispatch( { type: "SET_CURRENT_RelatedImageComment", current_relatedimagecomment:current_relatedimagecomment } ),

	};

};

const sagaMiddleWare = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(rootSaga);