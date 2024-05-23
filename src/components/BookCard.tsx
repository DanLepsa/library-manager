import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface BookCardProps {
  id: number;
  name: string;
  author: string;
  description?: string;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export const BookCard = ({
  id,
  name,
  author,
  description,
  onDelete,
  onEdit,
}: BookCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        background: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          color="info"
          size="small"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          color="error"
          size="small"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
