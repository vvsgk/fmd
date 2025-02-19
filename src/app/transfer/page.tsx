'use client';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { Stack } from '@/components/ui/stack';
import { RadioGroup } from '@/components/ui/radio-group';
import { Radio } from '@/components/ui/radio';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tooltip } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';


const PaymentForm = () => {
  // State for transaction details
  const [transactionType, setTransactionType] = useState<string>('IMPS');
  const [amount, setAmount] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  const [payeeAccNo, setPayeeAccNo] = useState<string>('');
  const [payeeIFSC, setPayeeIFSC] = useState<string>('');
  const [recurring, setRecurring] = useState<string>('no');
  const [frequency, setFrequency] = useState<string>('day');
  const [transactionCount, setTransactionCount] = useState<number | string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Toast for notifications
  const toast = useToast();

  // Fees calculator (dummy fees for each type)
  const calculateFees = () => {
    switch (transactionType) {
      case 'IMPS':
        return 10;
      case 'NEFT':
        return 15;
      case 'RTGS':
        return 30;
      case 'UPI':
        return 5;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    if (!payeeName || !payeeAccNo || !payeeIFSC || !amount) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields before submitting.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const transactionDetails = {
      transactionType,
      amount,
      payeeName,
      payeeAccNo,
      payeeIFSC,
      recurring,
      frequency,
      transactionCount,
      endDate,
      fee: calculateFees(),
    };

    console.log('Transaction Details:', transactionDetails);
    toast({
      title: 'Transaction Submitted',
      description: 'Your transaction has been submitted successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box width="500px" p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Transaction Form
      </Text>

      <Stack spacing={4}>

        <Box>
          <Text fontSize="md">Transaction Type</Text>
          <Select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
            <option value="IMPS">IMPS</option>
            <option value="NEFT">NEFT</option>
            <option value="RTGS">RTGS</option>
            <option value="UPI">UPI</option>
          </Select>
        </Box>

        <Box>
          <Text fontSize="md">Amount</Text>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Box>

        <Box>
          <Text fontSize="md">Payee Name</Text>
          <Input value={payeeName} onChange={(e) => setPayeeName(e.target.value)} />
        </Box>

        <Box>
          <Text fontSize="md">Payee Account Number</Text>
          <Input value={payeeAccNo} onChange={(e) => setPayeeAccNo(e.target.value)} />
        </Box>

        <Box>
          <Text fontSize="md">Payee IFSC Code</Text>
          <Input value={payeeIFSC} onChange={(e) => setPayeeIFSC(e.target.value)} />
        </Box>

        <Box>
          <Text fontSize="md">Recurring Payment</Text>
          <RadioGroup onChange={setRecurring} value={recurring}>
            <Stack direction="row">
              <Radio value="no">No</Radio>
              <Radio value="yes">Yes</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        {recurring === 'yes' && (
          <>
            <Box>
              <Text fontSize="md">Payment Frequency</Text>
              <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </Select>
            </Box>

            <Box>
              <Text fontSize="md">Number of Transactions (optional)</Text>
              <Input type="number" value={transactionCount} onChange={(e) => setTransactionCount(e.target.value)} />
            </Box>

            <Box>
              <Text fontSize="md">End Date (optional)</Text>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Box>
          </>
        )}

        <Box>
          <Text fontSize="md">Transaction Fee: ₹{calculateFees()}</Text>
        </Box>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Submit Transaction
        </Button>

      </Stack>
    </Box>
  );
};

export default PaymentForm;
