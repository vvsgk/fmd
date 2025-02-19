<div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>INVESTMENT OPTIONS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Direct Property Investment */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Direct Property Investment</h3>
              <div className="grid grid-cols-3 gap-4">
                {propertyOptions.map((option, index) => (
                  <Card 
                    key={option.name} 
                    className="shadow-sm relative"
                    onMouseEnter={() => setHoveredCard({ type: 'property', index })}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-4 text-center">
                      <img src={option.img} alt={option.name} className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold">{option.name}</p>
                    </CardContent>
                    {hoveredCard?.type === 'property' && hoveredCard.index === index && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80 rounded-md transition-all duration-300">
                        <Button asChild variant="default" size="sm">
                          <a href="" target="_blank" rel="noopener noreferrer">
                            Explore Options
                          </a>
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* REITs Investment */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">REITs Investment</h3>
              <div className="grid grid-cols-3 gap-4">
                {reitOptions.map((option, index) => (
                  <Card 
                    key={option.name} 
                    className="shadow-sm relative"
                    onMouseEnter={() => setHoveredCard({ type: 'reit', index })}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <CardContent className="p-4 text-center">
                      <img src={option.img} alt={option.name} className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold">{option.name}</p>
                    </CardContent>
                    {hoveredCard?.type === 'reit' && hoveredCard.index === index && (
                      <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-100/80 rounded-md transition-all duration-300">
                        <Button asChild variant="default" size="sm">
                          <a href="" target="_blank" rel="noopener noreferrer">
                            Start Investment
                          </a>
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>