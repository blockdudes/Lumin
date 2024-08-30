"use client";
import { MultiSelect } from "@/components/createComponents/multiselect";
import { eduChain } from "@/constants/chains";
import { contract } from "@/constants/contracts";
import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Spinner,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import axios from "axios";
import { ethers } from "ethers";
import MarketplaceABI from "../MarketplaceABI.json";


const saveSubdomain = async (subdomain: string, marketplaceId: string) => {
  try {
    const response = await axios.post("/api/subdomain/set", {subdomain: subdomain, marketplaceId: marketplaceId});
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const CreateCourse = () => {
  const router = useRouter();
  const [isOwnedMarketplace, setIsOwnedMarketplace] = useState<boolean>();
  const [marketplaceName, setMarketplaceName] = useState<string>();
  const [marketplaceDescription, setMarketplaceDescription] =
    useState<string>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [feePercentage, setFeePercentage] = useState<string>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColorSet, setSelectedColorSet] =
    useState<string>("blue-white");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = useActiveAccount();
  const { data: categoryOptions } = useReadContract({
    contract: contract(eduChain),
    method: "function getCategories() external view returns (string[])",
    params: [],
  });

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  const handleCreateMarketplace = async () => {
    setIsLoading(true);
    console.log(
      "isOwnedMarketplace",
      isOwnedMarketplace,
      "marketplaceName",
      marketplaceName,
      "marketplaceDescription",
      marketplaceDescription,
      "thumbnail",
      thumbnail,
      "feePercentage",
      feePercentage,
      "selectedCategories",
      selectedCategories,
      "selectedColorSet",
      selectedColorSet
    );
    if (isOwnedMarketplace === undefined) {
      toast.error("Marketplace type cannot be empty");
      setIsLoading(false);
      return;
    }
    if (marketplaceName === undefined || marketplaceName === "") {
      toast.error("Marketplace name cannot be empty");
      setIsLoading(false);
      return;
    }
    if (marketplaceDescription === undefined || marketplaceDescription === "") {
      toast.error("Marketplace description cannot be empty");
      setIsLoading(false);
      return;
    }
    if (thumbnail?.name === undefined || thumbnail?.name === "") {
      toast.error("Marketplace thumbnail cannot be empty");
      setIsLoading(false);
      return;
    }
    if (feePercentage === undefined || feePercentage === "") {
      toast.error("Marketplace fee cannot be empty");
      setIsLoading(false);
      return;
    }
    if (selectedCategories.length === 0) {
      toast.error("Marketplace categories cannot be empty");
      setIsLoading(false);
      return;
    }
    if (selectedColorSet === undefined || selectedColorSet === "") {
      toast.error("Marketplace color set cannot be empty");
      setIsLoading(false);
      return;
    }
    var loader = toast.loading("Creating Marketplace");
    try {
      var thumbnailUrl = "";
      const formData = new FormData();
      formData.append("image", thumbnail);
      toast.dismiss(loader);
      loader = toast.loading("Storing Image");
      const response = await axios.post("/api/storeImage", formData);
      if (response.status === 200) {
        thumbnailUrl = response.data.data;
        toast.dismiss(loader);
        loader = toast.loading("Creating Marketplace on Blockchain");
      } else {
        toast.dismiss(loader);
        toast.error("Error storing image");
        setIsLoading(false);
        return;
      }

      const tx = prepareContractCall({
        contract: contract(eduChain),
        method:
          "function registerMarketplace(uint256 feePercent, string memory marketplaceName, string memory description, string memory image_url, string[] memory _categories, string memory theme, bool isOwnedResourcesMarketplace ) external",
        params: [
          BigInt(feePercentage),
          marketplaceName,
          marketplaceDescription,
          thumbnailUrl,
          selectedCategories,
          selectedColorSet,
          isOwnedMarketplace,
        ],
      });

      if (!account) {
        toast.dismiss(loader);
        toast.error("Account not found");
        setIsLoading(false);
        return;
      }

      const res = await sendAndConfirmTransaction({
        account,
        transaction: tx,
      });
      if (res.status === "success") {
        const iface = new ethers.utils.Interface(MarketplaceABI);
        const parsedLog = iface.parseLog(res.logs[0]);
        console.log(parsedLog)
        const hex = parsedLog.args[0]._hex
        let marketplaceId = ethers.BigNumber.from(hex).toString();
        await saveSubdomain(marketplaceName, marketplaceId);
        toast.dismiss(loader);
        toast.success("Marketplace created successfully");
        setIsLoading(false);
        router.push("/created");
      } else {
        toast.dismiss(loader);
        toast.error("Error creating marketplace");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.dismiss(loader);
      toast.error("Error creating marketplace");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="flex flex-col gap-4">
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Marketplace Orientation</div>
            <Select
              label="Select Version"
              placeholder={undefined}
              value={isOwnedMarketplace?.toString()}
              onChange={(value) => {
                if (value === "true" || value === "false") {
                  setIsOwnedMarketplace(value === "true");
                }
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <Option value="false">General Marketplace</Option>
              <Option value="true">Owned Resources Marketplace</Option>
            </Select>
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Name of the Marketplace</div>
            <Input
              placeholder="Enter the name of the marketplace"
              className="w-full"
              color="red"
              label="Name"
              value={marketplaceName}
              onChange={(e) => setMarketplaceName(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <div className="text-xl font-bold">
              Description of the Marketplace
            </div>
            <Input
              placeholder="Enter the description of the marketplace"
              className="w-full"
              color="red"
              label="Description"
              value={marketplaceDescription}
              onChange={(e) => setMarketplaceDescription(e.target.value)}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Thumbnail</div>
            <div className="border-1 border-blue-gray-300 border w-full h-full px-2 py-1 justify-start items-center rounded-lg flex gap-4">
              <span>Thumbnail: </span>
              <input
                id="thumbnail-input"
                type="file"
                color="blue"
                onChange={(e) => {
                  if (e.target.files) {
                    setThumbnail(e.target.files[0]);
                  }
                }}
              />
            </div>
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Fee Percentage</div>
            <Input
              placeholder="Enter the fee percentage"
              className="w-full"
              color="red"
              type="number"
              label="Fee percentage"
              value={feePercentage}
              onChange={(e) => {
                if (e.target.value !== undefined) {
                  if (
                    Number(e.target.value) >= 0 &&
                    Number(e.target.value) <= 10
                  ) {
                    setFeePercentage(e.target.value);
                  } else if (Number(e.target.value) > 10) {
                    toast.error("Marketplace fee cannot be greater than 10");
                    setFeePercentage("10");
                  } else {
                    toast.error("Marketplace fee cannot be less than 0");
                    setFeePercentage("0");
                  }
                }
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-[820px]"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Select Categories</div>
            <MultiSelect
              options={
                categoryOptions !== undefined
                  ? categoryOptions.map((option) => ({
                    value: option,
                    label: option,
                  }))
                  : undefined
              }
              onChange={handleCategoryChange}
            />
          </CardBody>
        </Card>
        <Card
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="min-w-full"
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            className="flex flex-col gap-4"
          >
            <div className="text-xl font-bold">Select the color theme </div>
            <div className="w-full flex  gap-20 ">
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="blue-white"
                  checked={selectedColorSet === "blue-white"}
                  onChange={() => {
                    setSelectedColorSet("blue-white");
                  }}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-blue-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="blue-gray"
                  checked={selectedColorSet === "blue-gray"}
                  onChange={() => {
                    setSelectedColorSet("blue-gray");
                  }}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-red-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
              <label className="flex gap-4">
                <input
                  type="radio"
                  name="colorSet"
                  value="yellow-white"
                  checked={selectedColorSet === "yellow-white"}
                  onChange={() => {
                    setSelectedColorSet("yellow-white");
                  }}
                />
                <div className="flex w-[100px] h-[35px] rounded-lg border-gray-400 border-2">
                  <div className="w-1/2 bg-yellow-500 rounded-l-md"></div>
                  <div className="w-1/2 bg-white rounded-r-md"></div>
                </div>
              </label>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button
          color="red"
          disabled={isLoading}
          className="mt-4"
          onClick={handleCreateMarketplace}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {isLoading ? (
            <div className="flex gap-2 px-8">
              <Spinner
                className="h-4 w-4"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateCourse;
