import React from "react";
import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";


interface RootState {
  user: {
    successMsg: string;
    errorMsg: string;
  };
}

const FinishSection: React.FC = () => {
  const dispatch = useDispatch();
  const { successMsg, errorMsg } = useSelector((state: RootState) => state.user);

  const handleReset = () => {
    // dispatch(resetState()); // Dispatch your reset action
    window.location.reload();
  };

  return (
    <div className="max-w-2xl w-full h-72 p-4 bg-white rounded-md mx-auto flex justify-center">
      {errorMsg.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full flex flex-col justify-center items-center"  
        >
          <div className="text-center flex flex-col items-center">
            <div className="relative h-20 w-20 rounded-full bg-destructive items-center flex justify-center">
              <CheckCheck size={48} className="text-primary-foreground" />
              <div className="absolute -z-10 h-10 w-10 rounded-full bg-sidebar-primary animate-ripple" />
            </div>
            <h2 className="pt-4 text-4xl text-primary font-bold">Error</h2>
          </div>
          <div className="text-center mt-4">
            <p className="text-base text-gray-700">{errorMsg}</p>
          </div>
          <div className="mt-4 flex">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>  
        </motion.div>
      )}
      
      {successMsg.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full flex flex-col justify-center items-center"
        >
          <div className="text-center flex flex-col items-center">
            <div className="relative h-20 w-20 rounded-full bg-secondary items-center flex justify-center">
              <CheckCheck size={48} className="text-primary" />
              <div className="absolute -z-10 h-10 w-10 rounded-full bg-sidebar-primary animate-ripple" />
            </div>
            <h2 className="pt-4 text-4xl text-primary font-bold">Successful</h2>
          </div>
          <div className="text-center mt-4">
            <p className="text-base text-gray-700">{successMsg}</p>
          </div>
          <div className="mt-4 flex">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FinishSection;