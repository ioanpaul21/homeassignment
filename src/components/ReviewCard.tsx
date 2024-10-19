import { Avatar, Box, Rating, Typography } from "@mui/material";

const ReviewComponent = ({ review }: any) => {
  return (
    <Box
      bgcolor={"background.default"}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        border: "1px solid #e0e0e0",
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Avatar
        alt={review.reviewerName}
        src={review.avatarUrl}
        sx={{ width: 46, height: 46, marginRight: 2 }}
      />

      <Box>
        <Typography variant="h6" component="div">
          {review.reviewerName}
        </Typography>

        <Rating
          name="read-only"
          value={review.rating}
          precision={0.5}
          readOnly
          sx={{ marginBottom: 1 }}
        />

        <Typography variant="body1">{review.comment}</Typography>
      </Box>
    </Box>
  );
};

export default ReviewComponent;
