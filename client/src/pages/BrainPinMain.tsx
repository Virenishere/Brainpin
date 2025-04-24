import BrainCard from "@/components/BrainCard";
import { Button } from "@/components/ui/button";
import { Plus, Share2 } from 'lucide-react';
import React, { useEffect, useState, useCallback } from "react";

const BrainPinMain = () => {
  return (
    <div className="h-screen p-4">
      <div className="flex flex-row justify-between">
        <div className="font-bold">All Notes</div>
        <div className="flex gap-2">
          <Button><Share2/> Share Brain</Button>
          <Button><Plus /> Add Content</Button>
        </div>
      </div>
      <div>
        <BrainCard />
      </div>
    </div>
  );
};

export default BrainPinMain;
