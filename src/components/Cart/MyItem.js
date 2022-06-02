import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MyItem() {

  const item = {
    "id": 2,
    "name": "ItemB",
    "desc": "ItemB is good",
    "price": 19.99,
    "img": "https://res.cloudinary.com/cae67/image/upload/v1652745758/kyle1_plkclv.png",
    "category_id": 2,
    "category_name": "Kanye NFT"
}

    return (
          <Grid container spacing={1} sx={{m:1, pr:2, border: '1px solid', borderRadius:1 }}>
            <Grid item xs={12} sm={12} md={12}>
              <Item>
                <Avatar alt={item.name} sx={{height:"30%", width:"30%"}} variant="rounded" src={item?.img}/>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Item sx={{height:"100%", alignContent:"center"}}>
                <Typography variant="subtitle1">
                  <strong>Item Name</strong>
                </Typography>
                <Typography variant="body1">
                  {item.name}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
            <Item sx={{height:"100%"}}>
            <Typography variant="subtitle1">
                  <strong>Price</strong>
                </Typography>
                <Typography variant="body1">
                  {item.price}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
            <Item sx={{height:"100%"}}>
            <Typography variant="subtitle1">
                  <strong>Item ID</strong>
                </Typography>
                <Typography variant="body1">
                  {item.id}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
            <Item sx={{height:"100%"}}>
            <Typography variant="subtitle1">
                  <strong>Item Description</strong>
                </Typography>
                <Typography variant="body1">
                  {item.desc}
                </Typography>
              </Item>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Item>Category Name</Item>
            </Grid>
          </Grid>
      );
    }

    