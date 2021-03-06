import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import useItems from '../hooks/useItems';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Error from './Error';
import { AppContext } from '../context/AppContext';

export default function ItemBrowser(category_id) {

  const {error, items} = useItems(category_id)

  // Bringing in addToCart function from the AppContext file
  const { addToCart, setAlert } = useContext(AppContext)

  handleAddToCart = (item) => {
    addToCart(item)
    setAlert(`You have added ${item.name} to your cart`)
  }

  if (!items) {
    return (
      <Box sx={{display: "flex"}}>
        <CircularProgress/>
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{display: "flex"}}>
        <Error>{error}</Error>
      </Box>
    )
  };

  return (
    <ImageList cols={3}>

      {items.map((item) => (
        <ImageListItem key={item.id}>
          <img
            src={`${item.img}`}
            srcSet={`${item.img}`}
            alt={item.name}
            loading="lazy"
          />

          <ImageListItemBar
            title={item.name}
            subtitle={'$'+item.price.toFixed(2)}
            actionIcon={<>
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
              <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${item.title}`}
              // The item here is the item that the user is currently on
              onClick={()=> {handleAddToCart(item)}}
            >
              <AddShoppingCartTwoToneIcon />
            </IconButton>
            </>}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
// const item1={
//   "id":1,
//   "name":"Itema",
//   "desc":"Itema is good",
//   "price":2.99,
//   "img":"https://res.cloudinary.com/cae67/image/upload/v1651792721/kanye_jvbkns.png",
//   "category_id":1
// }
// const item2={
//   "id":2,
//   "name":"ItemB",
//   "desc":"ItemB is good",
//   "price":12.99,
//   "img":"https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
//   "category_id":2
// }
// const item3={
//   "id":3,
//   "name":"ItemC",
//   "desc":"ItemC is good",
//   "price":200.00,
//   "img":"https://res.cloudinary.com/cae67/image/upload/v1652982371/cow_gkvuce.jpg",
//   "category_id":1
// }

// const items=[item1, item2, item3]