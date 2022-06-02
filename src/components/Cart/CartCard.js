/*
  This is the mid-level componenet. 
  The flow of {item} is this . . .
    Index.js -> CartItem.js -> CartCard.js -> AddRemoveCartItem.js being the lowest level componenet
*/

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddRemoveCartItem from './AddRemoveCartItem';

export default function CartCard({item}) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>

        <Typography variant="h6" gutterBottom>
          {item.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
         {item.desc.slice(0,20)}
        </Typography>

        <Typography variant="h6" color="text.secondary">
          ${item.price?.toFixed(2)}
        </Typography>

      </CardContent>
      <CardActions>
        // Passing through the cart item as item so we can access the item
        <AddRemoveCartItem item={item} />
      </CardActions>
    </Card>
  );
}

