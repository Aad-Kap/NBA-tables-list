import { Pagination } from "@mui/material";

const CustomPagination = ({ pageCount, page, setPage }) => {
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => setPage(value - 1)}
    />
  );
};

export default CustomPagination;
