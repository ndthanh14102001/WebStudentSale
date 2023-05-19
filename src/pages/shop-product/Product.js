import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect, useDispatch } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import callApi, { RESPONSE_TYPE } from "../../utils/callApi";
import { onCloseModalLoading, onOpenModalLoading } from "../../redux/actions/modalLoadingActions";
import { HelmetProvider, Helmet } from 'react-helmet-async';

const Product = ({ location, match }) => {
  const dispatch = useDispatch();
  const { pathname } = location;
  // const itemId = location.match.params.id;
  const [product, setProduct] = useState(null);
  const productId = match.params.id
  useEffect(() => {

    const getProductById = async () => {
      dispatch(onOpenModalLoading())
      const response = await callApi({
        url: process.env.REACT_APP_API_ENDPOINT + "/products/" + productId,
        method: "get",
        params: {
          populate: {
            userId: {
              populate: "*"
            },
            category: true,
            images: true
          }
        }
      });
      if (response.type === RESPONSE_TYPE) {
        setProduct(response.data?.data);
      }
      dispatch(onCloseModalLoading())
    }
    getProductById();
  }, [productId,dispatch])
  return (
    <Fragment>
      <HelmetProvider>
      <Helmet>
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product?.attributes?.name} - ${product?.id}`} />
        
        <meta
          name="description"
          content={`${product?.attributes?.name} - ${product?.id}`}
        />
      </Helmet>
    
      <MetaTags>
         <title>{product?.attributes?.name} - {product?.id}</title> 
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Sản phẩm
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        {product && <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />}

        {/* product description tab */}
        {product && <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product?.attributes?.description}
          id={product?.id}
        />}

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        /> */}
      </LayoutOne>
      </HelmetProvider>
    </Fragment>
  );
};

Product.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

// const mapStateToProps = (state, ownProps) => {
//   const itemId = ownProps.match.params.id;
//   return {
//     product: state.productData.products.filter(
//       single => single.id === itemId
//     )[0]
//   };
// };

export default Product;
