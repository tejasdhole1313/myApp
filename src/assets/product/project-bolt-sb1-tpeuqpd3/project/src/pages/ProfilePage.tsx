import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress } from '../services/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();
  
  // User profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  
  // Address states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(true);
  const [editAddressId, setEditAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    type: 'home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });
  
  // Loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Reset form when user changes
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
      });
    }
  }, [user]);
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  
  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };
  
  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const updatedUser = await updateProfile({
        name: profile.name,
        phone: profile.phone || undefined,
      });
      
      updateUser(updatedUser);
      setIsEditingProfile(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle add/edit address
  const handleSubmitAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (isAddingAddress) {
        // Add new address
        await addAddress(addressForm);
      } else if (editAddressId) {
        // Update existing address
        await updateAddress(editAddressId, addressForm);
      }
      
      // Refresh user data
      const updatedUser = await updateProfile({});
      updateUser(updatedUser);
      
      // Reset form
      setShowAddressForm(false);
      setAddressForm({
        type: 'home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save address');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Set address for editing
  const handleEditAddress = (address: any) => {
    setIsAddingAddress(false);
    setEditAddressId(address.id);
    setAddressForm({
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setShowAddressForm(true);
  };
  
  // Handle address deletion
  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    setError(null);
    
    try {
      await deleteAddress(id);
      
      // Refresh user data
      const updatedUser = await updateProfile({});
      updateUser(updatedUser);
    } catch (err: any) {
      setError(err.message || 'Failed to delete address');
    }
  };
  
  // Handle setting default address
  const handleSetDefaultAddress = async (id: string) => {
    setError(null);
    
    try {
      await setDefaultAddress(id);
      
      // Refresh user data
      const updatedUser = await updateProfile({});
      updateUser(updatedUser);
    } catch (err: any) {
      setError(err.message || 'Failed to set default address');
    }
  };
  
  if (!user) {
    return (
      <div className="container-custom py-8 text-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
        <User className="w-7 h-7 mr-2 text-primary-500" />
        My Profile
      </h1>
      
      {error && (
        <div className="mb-6 p-3 bg-error-100 text-error-500 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - User Profile */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="text-primary-500 hover:text-primary-600 flex items-center"
                >
                  <Edit size={16} className="mr-1" />
                  Edit
                </button>
              )}
            </div>
            
            {isEditingProfile ? (
              /* Edit Profile Form */
              <form onSubmit={handleUpdateProfile}>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    id="name"
                    name="name"
                    type="text"
                    value={profile.name}
                    onChange={handleProfileChange}
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                    required
                  />
                  
                  <Input
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                    disabled
                    helperText="Email cannot be changed"
                  />
                  
                  <Input
                    label="Phone Number"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    leftIcon={<Phone className="h-5 w-5 text-gray-400" />}
                  />
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      type="submit" 
                      variant="primary"
                      isLoading={isSubmitting}
                    >
                      Save Changes
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setProfile({
                          name: user.name,
                          email: user.email,
                          phone: user.phone || '',
                        });
                        setIsEditingProfile(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              /* Profile Display */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-900">
                      {user.phone || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Account Actions */}
          <div className="bg-white rounded-lg shadow-card p-6 mt-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Account</h2>
            
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Change Password
              </button>
              
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Notification Preferences
              </button>
              
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Payment Methods
              </button>
              
              <button 
                onClick={logout}
                className="w-full text-left px-4 py-2 text-error-600 hover:bg-error-50 rounded-lg transition-colors flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column - Addresses */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary-500" />
                My Addresses
              </h2>
              {!showAddressForm && (
                <button
                  onClick={() => {
                    setIsAddingAddress(true);
                    setEditAddressId(null);
                    setAddressForm({
                      type: 'home',
                      street: '',
                      city: '',
                      state: '',
                      zipCode: '',
                    });
                    setShowAddressForm(true);
                  }}
                  className="text-primary-500 hover:text-primary-600 flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add New
                </button>
              )}
            </div>
            
            {/* Address Form */}
            {showAddressForm && (
              <form onSubmit={handleSubmitAddress} className="mb-6 p-4 border border-gray-200 rounded-lg animate-fadeIn">
                <h3 className="font-medium mb-3">{isAddingAddress ? 'Add New Address' : 'Edit Address'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type
                    </label>
                    <select
                      name="type"
                      className="input"
                      value={addressForm.type}
                      onChange={handleAddressChange as any}
                      required
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      className="input"
                      placeholder="123 Main St"
                      value={addressForm.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="input"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="input"
                      placeholder="State"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      className="input"
                      placeholder="Zip Code"
                      value={addressForm.zipCode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  
                  {isAddingAddress && (
                    <div className="md:col-span-2 flex items-center">
                      <input
                        type="checkbox"
                        id="default-address"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="default-address" className="ml-2 text-sm text-gray-700">
                        Set as default address
                      </label>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                  >
                    {isAddingAddress ? 'Save Address' : 'Update Address'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
            
            {/* Address List */}
            {user.addresses.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">You don't have any saved addresses yet</p>
                {!showAddressForm && (
                  <Button
                    variant="primary"
                    className="mt-4"
                    leftIcon={<Plus size={16} />}
                    onClick={() => {
                      setIsAddingAddress(true);
                      setShowAddressForm(true);
                    }}
                  >
                    Add New Address
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <div 
                    key={address.id} 
                    className={`p-4 border rounded-lg ${address.isDefault ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-gray-900 capitalize">{address.type}</span>
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm">{address.street}</p>
                        <p className="text-gray-700 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditAddress(address)}
                          className="p-1 text-gray-500 hover:text-primary-500 rounded-full hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="p-1 text-gray-500 hover:text-error-500 rounded-full hover:bg-gray-100"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="mt-2 text-sm text-primary-500 hover:text-primary-600"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;