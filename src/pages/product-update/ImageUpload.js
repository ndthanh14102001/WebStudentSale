import React, { useState } from 'react'
import { useRef } from 'react';
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const ImageUploadBoxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "#f4f4f4",
  borderRadius: "8px",
  padding: "1rem",
  border: (theme) => "2px dashed " + theme.palette.primary.main
}
const ImageUpload = ({ productInfo, setProductInfo }) => {
  const inputFileRef = useRef();
  const inputFileAddRef = useRef();
  const [resetValueInput, setResetValueInput] = useState(false);
  const handleUploadImages = (e) => {

    setProductInfo(prev => ({
      ...prev,
      images: Object.values(e.target.files),
      isValidImages: true
    }));
    setResetValueInput(prev => !prev)
  }
  const handleAddImage = (e) => {
    // setFiles(prev => [...prev, ...Object.values(e.target.files)]);
    setProductInfo(prev => ({
      ...prev,
      images: [...prev.images, ...Object.values(e.target.files)],
      isValidImages: true
    }));
  }
  const handleRemoveImage = (index) => {
    // setFiles(prev => {
    //   return prev.filter((file, indexFile) => {
    //     return index !== indexFile
    //   });
    // });
    setProductInfo(prev => ({
      ...prev,
      images: prev.images.filter((file, indexFile) => {
        return index !== indexFile
      }),
      isValidImages: true
    }));
  };
  const handleShowImage = (file) => {
    try {
      return URL.createObjectURL(file)
    } catch (e) {
      const imageAttributes = file?.attributes;
      return process.env.REACT_APP_SERVER_ENDPOINT + imageAttributes?.url
    }
  }
  return (
    <>
      <input
        ref={inputFileAddRef}
        onChange={handleAddImage}
        hidden
        accept='image/*'
        type="file"
        multiple
      />
      <input
        ref={inputFileRef}
        key={resetValueInput || ''}
        onChange={handleUploadImages}
        hidden
        accept='image/*'
        type="file"
        multiple
      />
      <Box height="100%">
        {(!productInfo.images || productInfo.images?.length === 0) ?
          <Box
            onClick={() => inputFileRef.current.click()}
            sx={{
              height: "100%",
              ...ImageUploadBoxStyle
            }}>
            <AddPhotoAlternateIcon
              sx={{
                color: (theme) => theme.palette.primary.main,
                height: "60px",
                width: "60px",
              }}
            />
            <Typography fontWeight={"bold"}> Đăng từ 4 đến 6 hình ảnh</Typography>
          </Box> :
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box
                onClick={() => inputFileAddRef.current.click()}
                sx={{
                  height: "100%",
                  ...ImageUploadBoxStyle
                }}>
                <AddIcon sx={{
                  color: (theme) => theme.palette.primary.main,
                  height: "40px",
                  width: "40px",
                }} />
              </Box>
            </Grid>
            {productInfo.images.map((file, index) => {
              return <Grid item xs={3} key={index}>
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      zIndex: 100,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      transform: "translate(40%, -50%)",
                    }}>
                    <CloseIcon />
                  </IconButton>
                  <Avatar
                    src={handleShowImage(file)}
                    variant="square"
                    sx={{
                      width: "80px", height: "80px",
                      border: "1px solid #ccc",
                      "& img": {
                        objectFit: "contain",
                        background: "#f7f7f7"
                      }
                    }}
                  />
                </Box>
              </Grid>;
            })}
          </Grid>}
      </Box >
    </>
  )
}

export default ImageUpload