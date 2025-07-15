from langchain_core.language_models.llms import LLM
from functools import lru_cache
from app.llms.LLMProvider import LLMProvider
from app.llms.clients.ollama_client import OllamaProvider

class LLMFactory:
    _providers: Dict[str, LLMProvider] = {
        "ollama": OllamaProvider(),
    }
    
    @classmethod
    def register_provider(cls, name: str, provider: LLMProvider):
        """Register a new LLM provider"""
        cls._providers[name] = provider
    
    @classmethod
    def create_llm(cls, provider_name: str = "ollama", **kwargs) -> LLM:
        """Create an LLM instance using the specified provider"""
        if provider_name not in cls._providers:
            raise ValueError(f"Unknown provider: {provider_name}")
        
        return cls._providers[provider_name].create_llm(**kwargs)

    @lru_cache(maxsize=1)
    def get_llm(provider: str = "ollama", **kwargs) -> LLM:
        """Get cached LLM instance"""
        return LLMFactory.create_llm(provider, **kwargs)