using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using Mytruffle.Contracts.item.ContractDefinition;

namespace Mytruffle.Contracts.item
{
    public partial class ItemService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, ItemDeployment itemDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<ItemDeployment>().SendRequestAndWaitForReceiptAsync(itemDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, ItemDeployment itemDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<ItemDeployment>().SendRequestAsync(itemDeployment);
        }

        public static async Task<ItemService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, ItemDeployment itemDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, itemDeployment, cancellationTokenSource);
            return new ItemService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.IWeb3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public ItemService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public ItemService(Nethereum.Web3.IWeb3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<GetProductsOutputDTO> GetProductsQueryAsync(GetProductsFunction getProductsFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<GetProductsFunction, GetProductsOutputDTO>(getProductsFunction, blockParameter);
        }

        public Task<GetProductsOutputDTO> GetProductsQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryDeserializingToObjectAsync<GetProductsFunction, GetProductsOutputDTO>(null, blockParameter);
        }

        public Task<string> SetProductsRequestAsync(SetProductsFunction setProductsFunction)
        {
             return ContractHandler.SendRequestAsync(setProductsFunction);
        }

        public Task<TransactionReceipt> SetProductsRequestAndWaitForReceiptAsync(SetProductsFunction setProductsFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setProductsFunction, cancellationToken);
        }

        public Task<string> SetProductsRequestAsync(string prodName, string cate, string alternative, BigInteger id1, BigInteger id2)
        {
            var setProductsFunction = new SetProductsFunction();
                setProductsFunction.ProdName = prodName;
                setProductsFunction.Cate = cate;
                setProductsFunction.Alternative = alternative;
                setProductsFunction.Id1 = id1;
                setProductsFunction.Id2 = id2;
            
             return ContractHandler.SendRequestAsync(setProductsFunction);
        }

        public Task<TransactionReceipt> SetProductsRequestAndWaitForReceiptAsync(string prodName, string cate, string alternative, BigInteger id1, BigInteger id2, CancellationTokenSource cancellationToken = null)
        {
            var setProductsFunction = new SetProductsFunction();
                setProductsFunction.ProdName = prodName;
                setProductsFunction.Cate = cate;
                setProductsFunction.Alternative = alternative;
                setProductsFunction.Id1 = id1;
                setProductsFunction.Id2 = id2;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(setProductsFunction, cancellationToken);
        }
    }
}
