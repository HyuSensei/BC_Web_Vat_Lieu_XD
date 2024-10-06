import React, { useState } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchClick = () => {
    if (!search.trim()) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    navigate(`/search?name=${encodeURIComponent(search.trim())}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchClick();
    }
  };

  return (
    <Container className="my-4">
      <InputGroup className="mb-3 w-75 mx-auto">
        <FormControl
          placeholder="Nhập tên sản phẩm..."
          aria-label="Tìm kiếm sản phẩm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="primary"
          onClick={searchClick}
          style={{
            backgroundColor: "#14134f",
            borderColor: "#14134f",
          }}
        >
          <FaSearch />
        </Button>
      </InputGroup>
    </Container>
  );
};

export default SearchInput;
