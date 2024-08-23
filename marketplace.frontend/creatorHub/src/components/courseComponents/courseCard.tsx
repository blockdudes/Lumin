import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CourseCard({
  img,
  title,
  description,
  onClick,
}: {
  img: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="mt-6 w-80"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      onClick={onClick}
    >
      <CardHeader
        color="blue-gray"
        className="relative h-40"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <img src={img} alt="card-image" />
      </CardHeader>
      <CardBody
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 "
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {title}
        </Typography>
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="text-sm"
        >
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}
